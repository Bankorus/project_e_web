import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services';
// import {AppAlertService} from '../../shared/components/app-alert/app-alert.service';

@Component({
  selector: 'app-reg-introduction',
  templateUrl: './reg-introduction.component.html',
  styleUrls: ['./reg-introduction.component.scss']
})
export class RegIntroductionComponent implements OnInit {

  public type: string;

  constructor(
    // private pageAccessSvc: PageAccessService,
    // private userSvc: UserService,
    private navigationSvc: NavigationService,
    // private alertSvc: AppAlertService
    ) {

  }

  public userInfo = null;

  ngOnInit() {

  }

  toPolicy() {
    this.navigationSvc.toPolicy();
  }

  toService() {
    this.navigationSvc.toService();
  }

  toFAQ() {
    this.navigationSvc.toFAQ();
  }

}
