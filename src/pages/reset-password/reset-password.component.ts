import { Component, OnInit } from '@angular/core';
import {NavigationService, UserService} from '../../services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordValidator} from '../../shared/validators';
import {ERROR_MESSAGE} from '../../shared/data';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public token: string;
  public isVisible = false;
  public isnzFooter = null;
  public isnzClose = null;
  public isSuccess = true;
  public notClickable = true;
  public submitDisabled = true;
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), passwordValidator()]);
  public rePasswordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), passwordValidator()]);
  public resetForm = new FormGroup({
    password: this.passwordControl,
    rePassword: this.rePasswordControl,
  });
  public resetFormError = {
    password: '',
    rePassword: '',
    server: ''
  };

  constructor(
    // private pageAccessSvc: PageAccessService,
    private userSvc: UserService,
    private navigationSvc: NavigationService,
    private activatedRoute: ActivatedRoute,
    ) {

  }

  ngOnInit() {
    const snapshot = this.activatedRoute.snapshot;
    this.token = snapshot.queryParams['token'];
    // console.log(this.token);
  }

  resetPassword() {
    this.passwordValidate();
    this.rePasswordValidate();
    const password = this.passwordControl.value;
    const confirm_password = this.rePasswordControl.value;
    if (this.resetForm.valid) {
      this.userSvc.resetPassword(this.token, password, confirm_password).then( res => {
        this.isVisible = true;
        this.isSuccess = true;
        setTimeout(() => {
          this.isVisible = false;
          this.navigationSvc.toLogin();
        }, 3000);
      }, err => {
        this.isVisible = true;
        this.isSuccess = false;
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
        console.log('error');
      });
    }
  }

  validateAll() {
    if (this.resetForm.valid) {
      this.submitDisabled = false;
      this.notClickable = false;
    }
  }

  public passwordValidate() {
    if (this.rePasswordControl.value) {
      this.rePasswordValidate();
    }
    const errors = this.passwordControl.errors;
    if (errors) {
      if (errors.required) {
        this.resetFormError.password = ERROR_MESSAGE.common.required;
      } else if (errors.minlength) {
        this.resetFormError.password = ERROR_MESSAGE.common.pwdLength;
      } else if (errors.maxlength) {
        this.resetFormError.password = ERROR_MESSAGE.common.pwdLength;
      } else if (errors.password) {
        this.resetFormError.password = ERROR_MESSAGE.registerPage.simplePassword;
      }
    } else {
      this.resetFormError.password = '';
    }
    this.validateAll();
  }

  public rePasswordValidate() {
    const errors = this.rePasswordControl.errors;
    if (errors && errors.required) {
      this.resetFormError.rePassword = ERROR_MESSAGE.common.required;
    } else if (this.rePasswordControl.value !== this.passwordControl.value) {
      this.resetFormError.rePassword = ERROR_MESSAGE.registerPage.passwordNotMatch;
    } else {
      this.resetFormError.rePassword = '';
    }
    this.validateAll();
  }

}
