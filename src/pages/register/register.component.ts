import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UserService, NavigationService} from '../../services';
import {environment} from '../../environments/environment';
import {ERROR_MESSAGE} from '../../shared/data';
import {
  emailValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
  areaCodeValidator,
  phoneValidator} from '../../shared/validators';
// import {RecaptchaComponent} from 'ng-recaptcha';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public isVisible = false;
  public isnzFooter = null;
  public isnzClose = null;
  public notClickable = true;
  public email: string;

  public siteKey = environment.siteKey;
  public submitDisabled = true;
  public firstnameControl = new FormControl('', [Validators.required, firstNameValidator()]);
  public lastnameControl = new FormControl('', [Validators.required, lastNameValidator()]);
  public emailControl = new FormControl('', [Validators.required, emailValidator()]);
  public codeControl = new FormControl('', [Validators.required, areaCodeValidator()]);
  public phoneControl = new FormControl('', [Validators.required, phoneValidator()]);
  // public hearControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), passwordValidator()]);
  public rePasswordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), passwordValidator()]);
  public termsCheckControl = new FormControl(false, [Validators.requiredTrue]);
  public policyCheckControl = new FormControl(false, [Validators.requiredTrue]);
  // public reCaptchaControl = new FormControl('', [Validators.required]);
  public regForm = new FormGroup({
    firstname: this.firstnameControl,
    lastname: this.lastnameControl,
    code: this.codeControl,
    phone: this.phoneControl,
    email: this.emailControl,
    password: this.passwordControl,
    rePassword: this.rePasswordControl,
    // hear: this.hearControl,
    termsCheck: this.termsCheckControl,
    policyCheck: this.policyCheckControl,
    // reCaptcha: this.reCaptchaControl
  });

  public regFormError = {
    email: '',
    password: '',
    rePassword: '',
    firstname: '',
    lastname: '',
    code: '',
    phone: '',
    // hear: '',
    termsCheck: '',
    policyCheck: '',
    server: ''
  };
  // @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;

  constructor(
    private userSvc: UserService,
    private navigationSvc: NavigationService,
    // private commonSvc: CommonService,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  // ngOnInit() {
  //   const snapshot = this.activatedRoute.snapshot;
  //   const email = snapshot.queryParams['email'];
  //   if (email) {
  //     // this.emailControl.setValue(email);
  //   }
  // }

  ngOnInit(): void {

  }

  // showSuccessModal() {
  //   this.isVisible = true;
  // }

  closeModal() {
    this.isVisible = false;
  }

  validateAll() {
    if (this.regForm.valid) {
      this.submitDisabled = false;
      this.notClickable = false;
    } else {
      this.submitDisabled = true;
      this.notClickable = true;
    }
  }

  register() {
    this.emailValidate();
    this.firstNameValidate();
    this.lastNameValidate();
    this.areaCodeValidate();
    this.phoneValidate();
    this.passwordValidate();
    this.rePasswordValidate();
    this.termsCheckValidate();
    this.policyCheckValidate();
    // this.hearAboutValidate();
    if (this.passwordControl.value !== this.rePasswordControl.value) return;
    if (this.regForm.valid) {
      const email = this.emailControl.value;
      const password = this.passwordControl.value;
      const last_name = this.lastnameControl.value;
      const first_name = this.firstnameControl.value;
      const areacode = this.codeControl.value;
      const phonenum = this.phoneControl.value;
      // const hear = this.hearControl.value;
      this.userSvc.register(email, password, last_name, first_name, areacode, phonenum).then(res => {
        // console.log('register return ======', res);
        this.isVisible = true;
        this.submitDisabled = true;
      }, err => {
        if (err.error_code && err.error_code === 'email_registered') {
          this.regFormError.email = ERROR_MESSAGE.registerPage.emailRegistered;
        } else if (err.error_msg) {
          // this.alertSvc.showMessage(err.error_msg);
        } else {
          this.regFormError.server = ERROR_MESSAGE.common.server;
        }
      });
    } else {
      console.log('fail');
    }
  }

  public firstNameValidate() {
    const errors = this.firstnameControl.errors;
    if (errors) {
      if (errors.required) {
        this.regFormError.firstname = ERROR_MESSAGE.common.required;
      } else if (errors.firstname) {
        this.regFormError.firstname = ERROR_MESSAGE.common.errorFirstName;
      }
    } else {
      this.regFormError.firstname = '';
    }
    this.validateAll();
  }

  public lastNameValidate() {
    const errors = this.lastnameControl.errors;
    if (errors) {
      if (errors.required) {
        this.regFormError.lastname = ERROR_MESSAGE.common.required;
      } else if (errors.lastname) {
        this.regFormError.lastname = ERROR_MESSAGE.common.errorLastName;
      }
    } else {
      this.regFormError.lastname = '';
    }
    this.validateAll();
  }

  public emailValidate() {
    const errors = this.emailControl.errors;
    if (errors) {
      if (errors.required) {
        this.regFormError.email = ERROR_MESSAGE.common.required;
      } else if (errors.email) {
        this.regFormError.email = ERROR_MESSAGE.common.invalidEmail;
      }
    } else {
      this.regFormError.email = '';
    }
    this.validateAll();
  }

  public areaCodeValidate() {
    const errors = this.codeControl.errors;
    if (errors) {
      if (errors.required) {
        this.regFormError.code = ERROR_MESSAGE.common.required;
      } else if (errors.code) {
        this.regFormError.code = ERROR_MESSAGE.common.areaCode;
      }
    } else {
      this.regFormError.code = '';
    }
    this.validateAll();
  }

  public phoneValidate() {
    const errors = this.phoneControl.errors;
    if (errors) {
      if (errors.required) {
        this.regFormError.code = ERROR_MESSAGE.common.required;
      } else if (errors.phone) {
        this.regFormError.code = ERROR_MESSAGE.common.phone;
      }
    } else {
      this.regFormError.code = '';
    }
    this.validateAll();
  }

  public passwordValidate() {
    if (this.rePasswordControl.value) {
      this.rePasswordValidate();
    }
    const errors = this.passwordControl.errors;
    if (errors) {
      if (errors.required) {
        this.regFormError.password = ERROR_MESSAGE.common.required;
      } else if (errors.minlength) {
        this.regFormError.password = ERROR_MESSAGE.common.pwdLength;
      } else if (errors.maxlength) {
        this.regFormError.password = ERROR_MESSAGE.common.pwdLength;
      } else if (errors.password) {
        this.regFormError.password = ERROR_MESSAGE.registerPage.simplePassword;
      }
    } else {
      this.regFormError.password = '';
    }
    this.validateAll();
  }

  public rePasswordValidate() {
    const errors = this.rePasswordControl.errors;
    if (errors && errors.required) {
      this.regFormError.rePassword = ERROR_MESSAGE.common.required;
    } else if (this.rePasswordControl.value !== this.passwordControl.value) {
      this.regFormError.rePassword = ERROR_MESSAGE.registerPage.passwordNotMatch;
    } else {
      this.regFormError.rePassword = '';
    }
    this.validateAll();
  }

  public termsCheckValidate() {
    // if (this.termsCheckControl.value === false) {
    //   this.regFormError.termsCheck = ERROR_MESSAGE.registerPage.unconfirmTerms;
    // } else {
    //   this.regFormError.termsCheck = '';
    // }
    this.validateAll();
  }

  public policyCheckValidate() {
    // if (this.policyCheckControl.value === false) {
    //   this.regFormError.policyCheck = ERROR_MESSAGE.registerPage.unconfirmPolicy;
    // } else {
    //   this.regFormError.policyCheck = '';
    // }
    this.validateAll();
  }

  // public hearAboutValidate() {
  //   const errors = this.hearControl.errors;
  //   if (errors) {
  //     if (errors.required) {
  //       this.regFormError.hear = ERROR_MESSAGE.common.required;
  //     }
  //   } else {
  //     this.regFormError.hear = '';
  //   }
  //   this.validateAll();
  // }

  // public reCaptchaValidate() {
  //   const errors = this.reCaptchaControl.errors;
  //   if (errors) {
  //     if (!this.commonSvc.isGoogleCaptchaLoaded(this.el)) {
  //       this.regFormError.reCaptcha = ERROR_MESSAGE.common.robotUnloaded;
  //     } else {
  //       this.regFormError.reCaptcha = ERROR_MESSAGE.common.unconfirmRobot;
  //     }
  //   } else {
  //     this.regFormError.reCaptcha = '';
  //   }
  // }

  public termsCheckChange() {
    this.termsCheckValidate();
  }

  public policyCheckChange() {
    this.policyCheckValidate();
  }

  // handleCorrectCaptcha(str) {
  //   this.reCaptchaControl.setValue(str);
  //   this.reCaptchaValidate();
  // }

  // private resetCaptcha() {
  //   this.captcha.reset();
  //   this.reCaptchaControl.setValue('');
  // }

}
