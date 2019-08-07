import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services';
// import {AppAlertService} from '../../shared/components/app-alert/app-alert.service';

@Component({
  selector: 'app-terms-service',
  templateUrl: './terms-service.component.html',
  styleUrls: ['./terms-service.component.scss']
})
export class TermsServiceComponent implements OnInit {

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

  toPolicy() {
    this.navigationSvc.toPolicy();
  }

  toFAQ() {
    this.navigationSvc.toFAQ();
  }

  toReg() {
    this.navigationSvc.toReg();
  }
}
