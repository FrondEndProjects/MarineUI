import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="footer-container">
      <span class="created-by">
        Copyright © 2026 Salama Islamic Arab Insurance Company, all rights reserved.
      </span>
      <div class="footer-links">
        <a href="https://salama.ae/privacy-policy/" target="_blank">Privacy Policy</a>
        <span class="sep">·</span>
        <a href="https://salama.ae/terms-of-use/" target="_blank">Terms of Service</a>
        <span class="sep">·</span>
        <a href="https://salama.ae/contact-us/" target="_blank">Contact Us</a>
      </div>
    </div>
  `,
})
export class FooterComponent {
  userDetails: any;
  constructor(){
     this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     this.userDetails?.InsuranceId
  }
}
