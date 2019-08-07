import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services';
// import {AppAlertService} from '../../shared/components/app-alert/app-alert.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

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

  toReg() {
    this.navigationSvc.toReg();
  }

}
