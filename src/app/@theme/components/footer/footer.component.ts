import { Component } from '@angular/core';
@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="footer-container">
      <span class="footer-copyright">
        Copyright © 2026 Salama Islamic Arab Insurance Company, all rights reserved.
      </span>
      <div class="footer-links">
        <a href="https://salama.ae/terms-of-use/" target="_blank">Terms of use</a>
        <span class="footer-link-sep">|</span>
        <a href="https://salama.ae/privacy-policy/" target="_blank">Privacy policy</a>
        <span class="footer-link-sep">|</span>
        <a href="https://salama.ae/refund-policy/" target="_blank">Refund policy</a>
        <span class="footer-link-sep">|</span>
        <a href="https://salama.ae/" target="_blank">Website information</a>
      </div>
      <div class="footer-social">
        <a href="https://www.facebook.com/salamauae" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://x.com/salamauae" target="_blank" aria-label="X"><i class="fab fa-x-twitter"></i></a>
        <a href="https://www.linkedin.com/company/salama" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://www.instagram.com/salamauae" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
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