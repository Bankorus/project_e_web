import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services';
// import {AppAlertService} from '../../shared/components/app-alert/app-alert.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  public type: string;

  constructor(
    // private pageAccessSvc: PageAccessService,
    // private userSvc: UserService,
    private navigationSvc: NavigationService,
    // private alertSvc: AppAlertService
    ) {

  }

  ngOnInit() {

  }

  toService() {
    this.navigationSvc.toService();
  }

  toFAQ() {
    this.navigationSvc.toFAQ();
  }

  toReg() {
    this.navigationSvc.toReg();
  }

}
