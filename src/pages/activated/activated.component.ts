import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services';
// import {AppAlertService} from '../../shared/components/app-alert/app-alert.service';

@Component({
  selector: 'app-activated',
  templateUrl: './activated.component.html',
  styleUrls: ['./activated.component.scss']
})
export class ActivatedComponent implements OnInit {

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

  toLogin() {
    this.navigationSvc.toLogin();
  }

}
