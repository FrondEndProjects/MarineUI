import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
  <!-- First Assurance   -->
    </span>
    <div class="socials">
      <a  class="ion ion-social-github"></a>
      <a  class="ion ion-social-facebook"></a>
      <a  class="ion ion-social-twitter"></a>
      <a  class="ion ion-social-linkedin"></a>
      <!-- <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a> -->
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
