import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  public OpenCover:any;

  constructor() {
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));

  }

  ngOnInit(): void {
  }

}
