import { Component, OnInit } from '@angular/core';
import {NavigationService, UserService} from '../../services';
import {ActivatedRoute} from '@angular/router';
// import {AppAlertService} from '../../shared/components/app-alert/app-alert.service';

@Component({
  selector: 'app-overdue',
  templateUrl: './overdue.component.html',
  styleUrls: ['./overdue.component.scss']
})
export class OverdueComponent implements OnInit {

  public isVisible = true;
  public isSuccessVisible = false;
  public isSuccess = false;
  public isnzFooter = null;
  public isnzClose = null;
  public notClickable = true;
  public email: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationSvc: NavigationService,
    private userSvc: UserService,
    ) {

  }

  ngOnInit() {
    const snapshot = this.activatedRoute.snapshot;
    this.email = snapshot.queryParams['email'];
  }

  showModal() {
    this.overdueResend();
  }

  closeModal() {
    this.isVisible = false;
  }

  overdueResend() {
    this.userSvc.overdueResend(this.email).then(res => {
      this.isVisible = true;
    }, err => {
      this.isVisible = false;
      this.isSuccessVisible = true;
      this.isSuccess = false;
      setTimeout(() => {
        this.isSuccessVisible = false;
      }, 3000);
    });
  }

  resend() {
    this.userSvc.overdueResend(this.email).then(res => {
      this.isVisible = false;
      this.isSuccessVisible = true;
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccessVisible = false;
        // this.navigationSvc.toLogin();
      }, 3000);
    }, err => {
      this.isSuccessVisible = true;
      this.isSuccess = false;
      setTimeout(() => {
        this.isSuccessVisible = false;
      }, 3000);
    });
  }

}
