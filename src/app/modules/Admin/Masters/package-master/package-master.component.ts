import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package',
  templateUrl: './package-master.component.html',
  styleUrls: ['./package-master.component.scss'],
})
export class PackageMasterComponent implements OnInit {

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
    sessionStorage.removeItem('packageTransportId');
    sessionStorage.removeItem('packageId');
    this.router.navigate(['add-edit'], { relativeTo: this.route });
  }

}
