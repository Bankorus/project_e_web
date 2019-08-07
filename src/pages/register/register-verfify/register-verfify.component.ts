import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
// import {VerificationCodeComponent} from '../../../shared/components/verification-code/verification-code';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
// import {NavigationService, UserService} from '../../../services';
// import {AppAlertModule} from '../../../shared/components/app-alert/app-alert.module';
// import {AppAlertService} from '../../../shared/components/app-alert/app-alert.service';
// import {ERROR_MESSAGE} from '../../../shared/data';

@Component({
  selector: 'app-register-verfify',
  templateUrl: './register-verfify.component.html',
  styleUrls: ['./register-verfify.component.scss']
})
export class RegisterVerfifyComponent implements OnInit, OnDestroy {

  public isTimePassed = false;
  public defSeconds = 60;
  public seconds = 0;
  public timer = null;
  public msgTime = 1500;
  public userInfoObj = null;
  public submitDisabled = true;
  public verifyCodeError = '';
  // @ViewChild(VerificationCodeComponent) verifyCode;

  constructor(
    private route: ActivatedRoute,
    // private userSvc: UserService,
    // private navigationSvc: NavigationService,
    // private alertSvc: AppAlertService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const resendKey = params['resendKey'];
      this.userInfoObj = {
        email, resendKey
      }
      console.log(this.userInfoObj)
      this.startTimer();
    });
  }

  ngOnDestroy() {
    this.seconds = 0;
    this.isTimePassed = false;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
    this.userInfoObj = null;
  }

  startTimer() {
    const that = this;
    // this.verifyCode.reset();
    this.isTimePassed = false;
    this.seconds = this.defSeconds;
    this.timer = setInterval(() => {
      if (that.seconds === 0) {
        clearInterval(that.timer);
        that.timer = null;
        that.isTimePassed = true;
      }
      that.seconds--;
    }, 1000);
  }

  onComplete() {

  }

  onClear() {

  }

  // registerAction(code) {
  //   const obj = {
  //     email: this.userInfoObj.email,
  //     registration_key: this.userInfoObj.resendKey,
  //     code
  //   };
  //   this.userSvc.registerAction(obj).then(res => {
  //     this.navigationSvc.toActivationLogin();
  //   }).catch(err => {
  //     if (err.error_code && err.error_code === 'invalid_code') {
  //       this.showMessage(ERROR_MESSAGE.common.codeIncorrect);
  //     } else if (err.error_msg) {
  //       this.showMessage(err.error_msg);
  //     } else {
  //       this.showMessage(ERROR_MESSAGE.common.server);
  //     }
  //     setTimeout(() => {
  //       this.verifyCodeError = '';
  //       this.verifyCode.reset();
  //       this.verifyCode.inputFocus();
  //     }, this.msgTime);
  //   });
  // }

  showMessage(msg) {
    // this.alertSvc.showMessage(msg);
    this.verifyCodeError = msg;
  }

  // resend() {
  //   this.verifyCode.inputFocus();
  //   const obj = {
  //     email: this.userInfoObj.email,
  //     registration_key: this.userInfoObj.resendKey
  //   };
  //   this.userSvc.registerSendVerifyEmail(obj).then(res => {
  //     this.startTimer();
  //   }).catch(err => {
  //     console.log(err);
  //     this.showMessage(err.error_msg);
  //   });
  // }

}
