import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../modules/login/login.service';
import { CustomerProduct } from '../../modules/customer-product.model';
import * as Mydatas from '../../app-config.json';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Auth/auth.service';
import * as CryptoJS from 'crypto-js';
import { SharedService } from '../../shared/shared.service';

interface UserType {
  code: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public AppConfig: any = (Mydatas as any).default;
  private readonly AdminUrl: string = this.AppConfig.AdminUrl;
  private readonly CommonApiUrl: string = this.AppConfig.CommonApiUrl;

  productImageMap: { [key: string]: string } = {};
  imageMappings: {
    products: { [key: string]: string };
    userTypes: UserType[]
  };

  products: CustomerProduct[];
  loginId: any = null;
  branches: any[] | undefined;
  selectedBranch: boolean = true;
  lang: any = null;
  cities: any[] = [];
  userType: any = null;
  selectedProduct: string = '';
  user: any;
  subUserType: string;
  typeList: any[] = [];

  // ── Section flags ────────────────────────────────────────────────────────
  /** Default: show product section */
  quoteSection: boolean = false;
  /** Default: hide admin/approver section */
  approverSection: boolean = false;
  /** Drives the Admin toggle in the template */
  isAdminView: boolean = false;
  /**
   * Controls visibility of the Admin/Product toggle button.
   * true  → subuser level is 'high' AND typeList includes BOTH 'Quotation' (low) and 'Approver' (high)
   * false → subuser level is 'low' OR typeList includes only 'Quotation'
   */
  showAdminToggle: boolean = false;
  /**
   * Prevents any section from rendering until the subuser-type API has resolved.
   * Set to true after getTypeList() callback fires (or immediately for non-Issuer users).
   * This eliminates the flicker where Product section briefly appears before
   * Condition 4 (Approver-only) switches it to Admin.
   */
  sectionResolved: boolean = false;

  UserTypeList: any[] = [];
  insuranceId: any = null;
  menuList: any[] = [];
  validInsuranceIds = ["100046", "100047", "100048", "100049", "100050"];

  // ── Product filter controls ──────────────────────────────────────────────
  /** false = Individual (default), true = Package */
  isPackageView: boolean = false;
  searchText: string = '';
  filteredProducts: any[] = [];

  loginAccess: any;
  referralAccess: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private SharedService: SharedService,
    private authService: AuthService
  ) {
    this.user = this.authService?.getLoginDetails();
    this.branches = this.user?.Result?.LoginBranchDetails;
    this.userType = this.user?.Result?.UserType;
    this.products = this.user?.Result?.BrokerCompanyProducts;
    this.subUserType = sessionStorage.getItem('typeValue');
    this.loginId = this.user?.Result?.LoginId;
    this.insuranceId = this.user?.Result?.InsuranceId;
    this.referralAccess = this.user?.Result?.ReferralManageAccess;
    this.loginAccess = this.user?.Result?.LoginCreationAccess;
  }

  ngOnInit(): void {
    if (this.userType == 'Issuer') {
      this.getTypeList();
    } else {
      // Non-Issuer: always start on product section — resolve immediately, no API wait
      this.quoteSection    = true;
      this.approverSection = false;
      this.isAdminView     = false;
      this.sectionResolved = true;
    }

    this.http.get<{ [key: string]: string }>('./assets/json/product-url.json')
      .subscribe({
        next: (data: any) => {
          if (this.loginAccess === 'N' && data.userTypes) {
            const index = data.userTypes.findIndex((u: any) => u.code === '2');
            if (index !== -1) data.userTypes.splice(index, 1);
          }
          if (this.referralAccess === 'N' && data.userTypes) {
            const index = data.userTypes.findIndex((u: any) => u.code === '3');
            if (index !== -1) data.userTypes.splice(index, 1);
          }
          this.imageMappings = data;
          console.log("image mappings", this.imageMappings);
          this.assignProductTypes();
          this.filterProducts();
        },
        error: (err) => {
          console.error('Error loading product image map:', err);
        },
      });
  }

  // ── Admin toggle handler ─────────────────────────────────────────────────
  /**
   * Called when the Admin/Product toggle changes.
   * isAdminView = true  → show admin (approver) section
   * isAdminView = false → show product section
   */
  onAdminToggle(): void {
    if (this.isAdminView) {
      // Switch to admin view
      this.quoteSection = false;
      this.approverSection = true;
    } else {
      // Switch back to product view
      this.quoteSection = true;
      this.approverSection = false;
    }
  }

  // ────────────────────────────────────────────────────────────────────────────

  assignProductTypes(): void {
    this.products = this.products.map(product => {
      const isPackage = product.PackageYn === 'Y';
      return {
        ...product,
        ProductType: isPackage ? 'package' : 'individual'
      };
    });
  }

  getTypeList() {
    const urlLink = `${this.CommonApiUrl}dropdown/subusertype`;
    // const urlLink = `${this.AdminUrl}dropdown/subusertype`;
    const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {
      const ReqObj = {
        InsuranceId: userDetails?.Result?.InsuranceId,
        LoginId: userDetails?.Result?.LoginId,
        BranchCode: userDetails?.Result?.BranchCode,
        UserType: userDetails?.Result?.UserType,
      };
      this.loginService
        .onPostMethodBearerSync(urlLink, ReqObj)
        .subscribe((data: any) => {
          console.log(data);
          if (data.Result) {
            this.typeList = data?.Result;
            if (this.typeList.length != 0) {
              const hasLow  = this.typeList.some((ele) => ele.Code === 'low');
              const hasHigh = this.typeList.some((ele) => ele.Code === 'high');

              if (hasLow && !hasHigh) {
                // Condition 1: subuser level is 'low' — show Product only, hide Admin toggle
                this.quoteSection    = true;
                this.approverSection = false;
                this.isAdminView     = false;
                this.showAdminToggle = false;
                this.sectionResolved = true;
              } else if (hasHigh && hasLow) {
                // Condition 2: level is 'high' AND list includes both Quotation (low) and Approver (high)
                // → show both sections via toggle
                this.quoteSection    = true;
                this.approverSection = false;
                this.isAdminView     = false;
                this.showAdminToggle = true;
                this.sectionResolved = true;
                this.getMenuList(userDetails, 'condition2');
              } else if (hasHigh && !hasLow) {
                // Condition 4: level is 'high' AND only Approver (no Quotation) — show Admin only, hide Product
                this.quoteSection    = false;
                this.approverSection = true;
                this.isAdminView     = true;
                this.showAdminToggle = false;
                this.sectionResolved = true;
                this.getMenuList(userDetails, 'condition4');
              } else {
                // Fallback: default to product section, no toggle
                this.quoteSection    = true;
                this.approverSection = false;
                this.isAdminView     = false;
                this.showAdminToggle = false;
                this.sectionResolved = true;
              }
            }
          }
        });
    }
  }

  // onSelectUserType(rowData: UserType) {
  //   const userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);

  //   if (rowData.code == '1') {
  //     sessionStorage.setItem('typeValue', 'low');
  //     this.quoteSection = true;
  //     this.approverSection = false;
  //     this.isAdminView = false;
  //     this.selectedBranch = true;
  //   } else if (rowData.code == '2') {
  //     if (this.branches.length != 0) {
  //       let branchCode = null;
  //       if (
  //         userDetails.Result.BranchCode == null ||
  //         userDetails.Result.BranchCode == '' ||
  //         userDetails.Result.BranchCode == undefined
  //       )
  //         branchCode = this.branches[0].BranchCode;
  //       else branchCode = userDetails.Result.BranchCode;
  //       const branchData: any = this.branches.find((ele) => ele.BranchCode == branchCode);
  //       userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
  //       userDetails.Result['BranchCode'] = branchData.BranchCode;
  //       userDetails.Result['BelongingBranch'] = branchData.BelongingBranch;
  //       userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
  //       userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
  //       this.insuranceId = branchData?.InsuranceId;
  //       sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
  //     }
  //     sessionStorage.setItem('typeValue', 'high');
  //     const insuranceIds = Array.isArray(this.insuranceId)
  //       ? this.insuranceId
  //       : [this.insuranceId];
  //     const CompanyCheck = insuranceIds.some(entry =>
  //       typeof entry == 'string'
  //         ? this.validInsuranceIds.includes(entry)
  //         : this.validInsuranceIds.includes(entry?.InsuranceId)
  //     );
  //     if (CompanyCheck && this.userType == 'Issuer') { this.loginService.setProductId(null); }
  //     this.router.navigate(['/logincreation']);
  //   } else if (rowData.code == '3') {
  //     sessionStorage.setItem('typeValue', 'high');
  //     this.quoteSection = true;
  //     this.approverSection = false;
  //     this.isAdminView = false;
  //   } else if (rowData.code == '4') {
  //     if (this.branches.length != 0) {
  //       let branchCode = null;
  //       if (
  //         userDetails.Result.BranchCode == null ||
  //         userDetails.Result.BranchCode == '' ||
  //         userDetails.Result.BranchCode == undefined
  //       )
  //         branchCode = this.branches[0].BranchCode;
  //       else branchCode = userDetails.Result.BranchCode;
  //       const branchData: any = this.branches.find((ele) => ele.BranchCode == branchCode);
  //       userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
  //       userDetails.Result['BranchCode'] = branchData.BranchCode;
  //       userDetails.Result['BelongingBranch'] = branchData.BelongingBranch;
  //       userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
  //       userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
  //       userDetails.Result['ProductId'] = "11";
  //       userDetails.Result['ProductName'] = "Marine Opencover Policy";
  //       userDetails.Result['UserTypeAlt'] = "admin";
  //       let encryptInfo = encodeURIComponent(
  //         CryptoJS.AES.encrypt(JSON.stringify(userDetails), 'secret key 123').toString()
  //       );
  //       location.href = `http://192.168.1.48:4700/#/customer-Redirect?e=${encryptInfo}`;
  //     }
  //   }
  // }
  onSelectUserType(rowData: any) {
    const userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);

    if (rowData.code == '1') {
      sessionStorage.setItem('typeValue', 'low');
      this.quoteSection = true;
      this.approverSection = false;
      this.isAdminView = false;
      this.selectedBranch = true;
    }
    else if (rowData.code == '2') {

      if (this.branches.length != 0) {
        let branchCode = userDetails.Result.BranchCode || this.branches[0].BranchCode;
        const branchData: any = this.branches.find((ele) => ele.BranchCode == branchCode);

        userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['BelongingBranch'] = branchData.BelongingBranch;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        this.insuranceId = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      }
      sessionStorage.setItem('typeValue', 'high');
      // Use the exact spelling from your routing file
      this.router.navigate(['/login-creation']);
    }
    else if (rowData.code == '3') {
      sessionStorage.setItem('typeValue', 'high');
      this.quoteSection = true;
      this.approverSection = false;
      this.isAdminView = false;
    }
    else if (rowData.code == '4') {
      if (this.branches.length != 0) {
        let branchCode = userDetails.Result.BranchCode || this.branches[0].BranchCode;
        const branchData: any = this.branches.find((ele) => ele.BranchCode == branchCode);

        userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['BelongingBranch'] = branchData.BelongingBranch;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        userDetails.Result['ProductId'] = "11";
        userDetails.Result['ProductName'] = "Marine Opencover Policy";
        userDetails.Result['UserTypeAlt'] = "admin";

        let encryptInfo = encodeURIComponent(
          CryptoJS.AES.encrypt(JSON.stringify(userDetails), 'secret key 123').toString()
        );

        // INTERNAL NAVIGATION instead of location.href
        this.router.navigate(['/customer-Redirect'], { queryParams: { e: encryptInfo } });
      }
    }
  }
  getMenuList(userDetails, callerCondition: 'condition2' | 'condition4' = 'condition2') {
    const urlLink = `${this.CommonApiUrl}admin/getmenulist`;
    let insuranceId = userDetails?.Result?.LoginBranchDetails[0]?.InsuranceId;
    let productId = userDetails?.Result?.BrokerCompanyProducts[0]?.ProductId;

    // Apply the correct section state after menu data loads — respects which condition called us
    const applySectionState = () => {
      if (callerCondition === 'condition4') {
        // Condition 4: Approver-only — keep Admin section visible, never switch to Product
        this.quoteSection    = false;
        this.approverSection = true;
        this.isAdminView     = true;
        this.showAdminToggle = false;
      } else {
        // Condition 2: both Quotation + Approver — default to Product, toggle available
        this.quoteSection    = true;
        this.approverSection = false;
        this.isAdminView     = false;
        this.showAdminToggle = true;
      }
    };

    if (productId && insuranceId) {
      const ReqObj = {
        LoginId: this.loginId,
        UserType: this.userType,
        SubUserType: "high",
        InsuranceId: insuranceId,
        ProductId: productId,
      };
      this.loginService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.menuList = data.Result;
          }
          // Always restore correct section state after API completes
          applySectionState();
        });
    } else {
      applySectionState();
    }
  }

  // selectProduct(product) {
  //   const insuranceIds = Array.isArray(this.insuranceId)
  //     ? this.insuranceId
  //     : [this.insuranceId];
  //   const CompanyCheck = insuranceIds.some(entry =>
  //     typeof entry == 'string'
  //       ? this.validInsuranceIds.includes(entry)
  //       : this.validInsuranceIds.includes(entry?.InsuranceId)
  //   );
  //   if (CompanyCheck && this.userType == 'Issuer') {
  //     this.loginService.setProductId(product.ProductId);
  //   }
  //   this.selectedProduct = product.ProductId;
  //   const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  //   userDetails.Result['ProductId'] = product.ProductId;
  //   userDetails.Result['ProductName'] = product.ProductName;
  //   userDetails.Result['PackageYn'] = product.PackageYn;
  //   userDetails.Result['UserTypeAlt'] = userDetails.Result.UserType;
  //   sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));

  //   if (product.ProductId == '3' || product.ProductId == '11') {
  //     let branchList = userDetails.Result.LoginBranchDetails;
  //     let branchData = branchList.find(
  //       ele => ele.BranchCode == userDetails.Result.BranchCode ||
  //         ele.BranchCode == userDetails.Result.BrokerBranchCode
  //     );
  //     if (branchData) {
  //       userDetails.Result['BelongingBranch'] = branchData?.BelongingBranch;
  //       userDetails.Result['OriginationCountryId'] = branchData?.OriginationCountryId;
  //       userDetails.Result['DestinationCountryId'] = branchData?.DestinationCountryId;
  //     }
  //     localStorage.setItem('Userdetails', JSON.stringify(userDetails));
  //     window.addEventListener('message', function (event) { });
  //     let encryptInfo = encodeURIComponent(
  //       CryptoJS.AES.encrypt(JSON.stringify(userDetails), 'secret key 123').toString()
  //     );
  //     location.href = `http://192.168.1.48:4700/#/customer-Redirect?e=${encryptInfo}`;
  //   }
  //   else this.router.navigate(['/']);

  //   if (product.ProductId == '95') {
  //     let branchList = userDetails.Result.LoginBranchDetails;
  //     console.log(userDetails, "userDetails");
  //     let branchData = branchList.find(
  //       ele => ele.BranchCode == userDetails.Result.BranchCode ||
  //         ele.BranchCode == userDetails.Result.BrokerBranchCode
  //     );
  //     if (branchData) {
  //       userDetails.Result['BelongingBranch'] = branchData?.BelongingBranch;
  //       userDetails.Result['OriginationCountryId'] = branchData?.OriginationCountryId;
  //       userDetails.Result['DestinationCountryId'] = branchData?.DestinationCountryId;
  //       userDetails.Result['SourceCode'] = userDetails.Result?.SourceCode;
  //       userDetails.Result['DivisionCode'] = branchData?.DivisionCode;
  //     }
  //     localStorage.setItem('Userdetails', JSON.stringify(userDetails));
  //     window.addEventListener('message', function (event) { });
  //     let encryptInfo = encodeURIComponent(
  //       CryptoJS.AES.encrypt(JSON.stringify(userDetails), 'secret key 123').toString()
  //     );
  //     location.href = `http://192.168.1.48:5200/#/branch-dashboard?e=${encryptInfo}`;
  //   } else this.router.navigate(['/']);
  // }
  selectProduct(product) {
    console.log(product, "productproductproduct");

    const insuranceIds = Array.isArray(this.insuranceId) ? this.insuranceId : [this.insuranceId];
    const CompanyCheck = insuranceIds.some(entry =>
      typeof entry == 'string' ? this.validInsuranceIds.includes(entry) : this.validInsuranceIds.includes(entry?.InsuranceId)
    );

    if (CompanyCheck && this.userType == 'Issuer') {
      this.loginService.setProductId(product.ProductId);
    }

    this.selectedProduct = product.ProductId;
    const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    userDetails.Result['ProductId'] = product.ProductId;
    userDetails.Result['ProductName'] = product.ProductName;
    userDetails.Result['PackageYn'] = product.PackageYn;
    userDetails.Result['InsuranceId'] = product.InsuranceId;
    userDetails.Result['BranchCode'] = userDetails.Result.LoginBranchDetails[0]?.BranchCode;
    userDetails.Result['UserTypeAlt'] = userDetails.Result.UserType;
    sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));

    // Shared Logic for Branch Data
    let branchList = userDetails.Result.LoginBranchDetails;
    let branchData = branchList.find(
      ele => ele.BranchCode == userDetails.Result.BranchCode || ele.BranchCode == userDetails.Result.BrokerBranchCode
    );
    console.log(branchData, "branchData");

    if (branchData) {
      userDetails.Result['BelongingBranch'] = branchData?.BelongingBranch;
      userDetails.Result['OriginationCountryId'] = branchData?.OriginationCountryId;
      userDetails.Result['DestinationCountryId'] = branchData?.DestinationCountryId;
      userDetails.Result['InsuranceId'] = branchData.InsuranceId;
      if (product.ProductId == '95') {
        userDetails.Result['SourceCode'] = userDetails.Result?.SourceCode;
        userDetails.Result['DivisionCode'] = branchData?.DivisionCode;
      }
    }

    localStorage.setItem('Userdetails', JSON.stringify(userDetails));

    // Generate Encryption for the route parameter
    let encryptInfo = encodeURIComponent(
      CryptoJS.AES.encrypt(JSON.stringify(userDetails), 'secret key 123').toString()
    );

    if (product.ProductId == '3' || product.ProductId == '11') {
      // INTERNAL NAVIGATION instead of location.href
      this.router.navigate(['/customer-Redirect'], { queryParams: { e: encryptInfo } });
    }
    else if (product.ProductId == '95') {
      // If branch-dashboard is in the same app, use router. Otherwise, keep location.href for external
      this.router.navigate(['/branch-dashboard'], { queryParams: { e: encryptInfo } });
    }
    else {
      this.router.navigate(['/']);
    }
  }

  getProductUrl(productId: string | number): string {
    const id = productId?.toString();
    return (
      this.imageMappings?.products?.[id] ||
      this.imageMappings?.products?.['default'] ||
      './assets/default.png'
    );
  }


  // ── Product-specific quotes ────────────────────────────────────────────────
  getProductQuote(productId: string | number, productName: string): string {
    const id = productId?.toString();
    const name = (productName || '').toLowerCase();

    const quoteMap: { [key: string]: string } = {
      '3': '"Every shipment deserves unwavering protection across all oceans."',
      '11': '"Open cover, endless horizons — your fleet, always protected."',
      '95': '"Renewal made simple — keeping your cover current, your mind at ease."',
    };

    if (quoteMap[id]) return quoteMap[id];

    // Fallback by product name keywords
    if (name.includes('marine') && name.includes('open'))
      return '"Sail further. Our open cover policy moves with every voyage."';
    if (name.includes('marine') && name.includes('one'))
      return '"One voyage, one policy — precisely tailored protection for every trip."';
    if (name.includes('cargo'))
      return '"Your cargo is your livelihood — we guard it mile after mile."';
    if (name.includes('hull'))
      return '"Built for the sea, covered by the best — hull insurance done right."';
    if (name.includes('liability') || name.includes('p&i'))
      return '"Liability doesn`t stop at the dock — neither does our coverage."';
    if (name.includes('fire') || name.includes('property'))
      return '"From shoreline to warehouse — complete property protection."';
    if (name.includes('health'))
      return '"Your crew `s health is your ship`s engine — keep it running strong."';
    if (name.includes('motor') || name.includes('vehicle'))
      return '"On every road, in every condition — drive with confidence."';
    if (name.includes('travel') || name.includes('trip'))
      return '"The world awaits — travel fearlessly with every risk covered."';
    if (name.includes('life') || name.includes('term'))
      return '"Protection that lasts a lifetime — peace of mind for those you love."';
    if (name.includes('renewal'))
      return '"Stay covered without a gap — seamless renewal, total peace of mind."';

    // Generic fallback
    return '"Trusted coverage for every risk — protecting what matters most."';
  }

  getAdminQuote(code: string): string {
    const map: { [key: string]: string } = {
      '1': '"Instant quotes, seamless policies — your trade, always protected."',
      '2': '"Manage access with precision — the right people, the right tools."',
      '3': '"Grow your network, grow your business — referrals made effortless."',
      '4': '"Full marine admin at your fingertips — oversee every voyage."',
    };
    return map[code] || '"Powerful tools for seamless insurance management."';
  }

  getUserInitials(): string {
    const name = this.user?.Result?.UserName || '';
    return name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) || 'U';
  }

  getUserTypeImage(code: string): string {
    const userType = this.imageMappings.userTypes.find((type: any) => type.code === code);
    return userType ? userType.url : './assets/images/default.jpg';
  }

  onGetBranch(data: any) {
    console.log("Fdatataaa : ", data);
    sessionStorage.setItem('Userdetails', JSON.stringify(data));
    this.branches = data?.Result?.LoginBranchDetails;
    this.userType = data?.Result?.UserType;
    this.products = data?.Result?.BrokerCompanyProducts;
    this.subUserType = sessionStorage.getItem('typeValue');
    this.selectedBranch = this.userType === 'Issuer'
      ? this.user?.Result?.BranchCode
      : this.user?.Result?.BrokerBranchCode;
    if (this.selectedBranch == undefined) window.location.reload();
  }

  checkLoginMenu(val) {
    if (val == 'Login Creation' || val == 'Masters')
      return this.menuList.some(ele => ele.title == val);
    else
      return (
        this.menuList.some(ele => ele.title == 'Login Creation') &&
        this.menuList.some(ele => ele.title == 'Masters')
      );
  }

  checkBranchBg(branch): string {
    const branchCode = this.userType === 'Issuer' ? branch.BranchCode : branch.BrokerBranchCode;
    return branchCode === this.selectedBranch ? '#1a5f68' : '';
  }

  getBackTo() {
    this.selectedBranch = false;
    // When going back, honour admin toggle state
    if (this.isAdminView) {
      this.approverSection = true;
      this.quoteSection = false;
    } else {
      this.approverSection = false;
      this.quoteSection = true;
    }
  }

  checkUserType(entry) {
    if (entry.code == '1') {
      return this.typeList.some(ele => ele.Code == 'low');
    } else if (entry.code == '2') {
      return this.menuList.some(ele => ele.title == 'Masters' || ele.title == 'Login Creation');
    } else if (entry.code == '3') {
      return this.menuList.some(ele => ele.title == 'Referal Management');
    } else if (entry.code == '4') {
      const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      let products = userDetails?.BrokerCompanyProducts;
      if (products) {
        return products.some(ele => ele.ProductId == '11');
      } else return true;
    }
  }

  checkUserTypeLabel(entry, label) {
    if (label == 'Login') {
      return this.menuList.some(ele => ele.title == 'Login Creation');
    } else if (label == 'Masters') {
      return this.menuList.some(ele => ele.title == 'Masters');
    }
  }

  filterProducts(): void {
    const typeFilter = this.isPackageView ? 'package' : 'individual';
    const search = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.ProductType === typeFilter &&
      product.ProductName?.toLowerCase().includes(search)
    );
  }
  homeRoute() {

  }
  onLogout() {
    this.setLogout();
  }
  setLogout() {
    const Req = {
      LoginId: this.loginId,
      Token: this.loginService.getToken(),
    };
    const urlLink = `${this.CommonApiUrl}authentication/logout`;
    this.SharedService.onPostMethodSync(urlLink, Req).subscribe(
      (data: any) => {
        console.log(data);
        // this.cookieService.delete(
        //   'XSRF-TOKEN',
        //   '/',
        //   'domain name',
        //   true,
        //   'None',
        // );
        sessionStorage.clear();
        this.authService.logout();
        this.router.navigate(['/home']);
      },
      (err: any) => {
        console.log(err);
        sessionStorage.clear();
        // this.cookieService.delete(
        //   'XSRF-TOKEN',
        //   '/',
        //   'domain name',
        //   true,
        //   'None',
        // );
        this.authService.logout();
        this.router.navigate(['/home']);
      },
    );
  }
}
