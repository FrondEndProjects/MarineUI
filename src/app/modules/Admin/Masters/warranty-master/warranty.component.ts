import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss'],
})
export class WarrantyComponent implements OnInit {

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
    sessionStorage.removeItem('warrantyData');
    this.router.navigate(['add-edit'], { relativeTo: this.route });
  }

}
