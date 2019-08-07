import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
  public homeUrl = '/home';
  public loginUrl = '/login';
  public registerUrl = '/register';
  public guideUrl = '/guide';
  public policyUrl = '/policy';
  public serviceUrl = '/service';
  public demandsUrl = '/demands';
  public FAQUrl = '/faq';
  public regUrl = '/reg';
  public reservationUrl = '/reservation';
  public issueUrl = '/issue';
  public whiteListUrl = '/whitelist';
  public uploadUrl = '/upload';

  constructor(private router: Router) { }

  toLogin() {
    this.router.navigateByUrl(this.loginUrl);
  }

  toRegister() {
    this.router.navigateByUrl(this.registerUrl);
  }

  toMetaMaskGuidePage() {
    this.router.navigateByUrl(this.guideUrl);
  }

  toPolicy() {
    this.router.navigateByUrl(this.policyUrl);
  }

  toService() {
    this.router.navigateByUrl(this.serviceUrl);
  }

  toGainDemandsPage() {
    this.router.navigateByUrl(this.demandsUrl);
  }

  toFAQ() {
    this.router.navigateByUrl(this.FAQUrl);
  }

  toReg() {
    this.router.navigateByUrl(this.regUrl);
  }

  toReservation() {
    this.router.navigateByUrl(this.reservationUrl);
  }

  toIssue() {
    this.router.navigateByUrl(this.issueUrl);
  }

  toWhiteList() {
    this.router.navigateByUrl(this.whiteListUrl);
  }

  toUpload() {
    this.router.navigateByUrl(this.uploadUrl);
  }

}


