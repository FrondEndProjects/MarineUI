import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commodity',
  templateUrl: './deposit-master.component.html',
  styleUrls: ['./deposit-master.component.scss'],
})
export class DepositMasterComponent implements OnInit {

  public showAddNewButton: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      if ( event.url.includes('add-edit')) {
        this.showAddNewButton = false;
      } else {
        this.showAddNewButton = true;
      }
    });
}

  ngOnInit(): void {
  }

  public goToAddNewPage() {
    //sessionStorage.removeItem('editBankId',null);
    sessionStorage.setItem('editBankId', null);
    this.router.navigate(['add-edit'], { relativeTo: this.route });
  }

}
