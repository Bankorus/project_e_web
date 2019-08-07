import {Component, ElementRef, ViewChild, OnInit, NgZone} from '@angular/core';
import {CommonService, NavigationService, UserService} from '../../services';
import { environment} from '../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {emailValidator, passwordValidator} from '../../shared/validators';
import {ERROR_MESSAGE} from '../../shared/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isActivating = false;
  public siteKey = environment.siteKey;
  public notClickable = true;
  public submitDisabled = true;
  public emailControl = new FormControl('', [ Validators.required, emailValidator() ]);
  public passwordControl = new FormControl('', [ Validators.required ]);
  // public reCaptchaControl = new FormControl('', [ Validators.required ]);
  public loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
    // reCaptcha: this.reCaptchaControl
  });

  public loginFormError = {
    email: '',
    password: '',
    // reCaptcha: '',
    server: ''
  };

  // @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userSvc: UserService,
    private commonSvc: CommonService,
    private navigationSvc: NavigationService,
    // private commonSvc: CommonService,
    private el: ElementRef,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .filter(params => params['isActivating'] === 'true')
      .subscribe(isActivating => {
        this.isActivating = true;
      });
    // const blockchain = this.commonSvc.getBlockChain();
    // blockchain.getNetwork().then(res => {
    //   console.log(res);
    // });
  }

  validateAll() {
    if (this.loginForm.valid) {
      this.submitDisabled = false;
      this.notClickable = false;
    } else {
      this.submitDisabled = true;
      this.notClickable = true;
    }
  }

  emailValidate() {
    const errors = this.emailControl.errors;
    if (errors) {
      if (errors.required) {
        this.loginFormError.email = ERROR_MESSAGE.common.required;
      } else if (errors.email) {
        this.loginFormError.email = ERROR_MESSAGE.common.invalidEmail;
      }
    } else {
      this.loginFormError.email = '';
    }
    this.validateAll();
  }

  public passwordValidate() {
    const errors = this.passwordControl.errors;
    if (errors) {
      if (errors.required) {
        this.loginFormError.password = ERROR_MESSAGE.common.required;
      }
    } else {
      this.loginFormError.password = '';
    }
    this.validateAll();
  }

  // public reCaptchaValiate() {
  //   const errors = this.reCaptchaControl.errors;
  //   if (errors) {
  //     if (!this.commonSvc.isGoogleCaptchaLoaded(this.el)) {
  //       this.loginFormError.reCaptcha = ERROR_MESSAGE.common.robotUnloaded;
  //     } else if (errors.required) {
  //       this.loginFormError.reCaptcha = ERROR_MESSAGE.common.unconfirmRobot;
  //     }
  //   } else {
  //     this.loginFormError.reCaptcha = '';
  //   }
  // }
  //

  login () {
    this.loginFormError.server = '';
    this.emailValidate();
    this.passwordValidate();
    // this.reCaptchaValiate();
    if (this.loginForm.valid) {
      const email = this.emailControl.value;
      const password = this.passwordControl.value;
      // const recaptcha = this.reCaptchaControl.value;
      this.userSvc.login(email, password).then( res => {

      }, err => {
        this.handleLoginSeverError(err);
        this.submitDisabled = false;
        // this.resetCaptcha();
      });
    }
  }

  // handleCorrectCaptcha (captcha) {
  //   this.reCaptchaControl.setValue(captcha);
  //   this.reCaptchaValiate();
  // }
  //
  handleLoginSeverError(err) {
    if (err.error_code === 'incorrect_password') {
      this.loginFormError.password = ERROR_MESSAGE.loginPage.wrongPassword;
    } else if (err.error_code === 'email_unregistered') {
      this.loginFormError.email = ERROR_MESSAGE.loginPage.wrongPassword;
    } else if (err.error_code === 'email_Linked_ThirdParty_Google') {
      this.loginFormError.email = ERROR_MESSAGE.common.emailLinkGoogle;
    } else if (err.error_code === 'account_inactive') {
      this.loginFormError.email = ERROR_MESSAGE.loginPage.wrongPassword;
    } else {
      if (err.error_fields && err.error_fields.password && err.error_fields.password.length > 0) {
        this.loginFormError.password = err.error_fields.password[0];
      } else if (err.error_fields && err.error_fields.email && err.error_fields.email.length > 0) {
        this.loginFormError.email = err.error_fields.email[0];
      } else {
        this.loginFormError.server = ERROR_MESSAGE.common.server;
      }
    }
  }

  // private resetCaptcha() {
  //   this.captcha.reset();
  //   this.reCaptchaControl.setValue('');
  // }


}
