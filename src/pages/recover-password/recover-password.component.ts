import { Component, OnInit } from '@angular/core';
import {NavigationService, UserService} from '../../services';
// import {AppAlertService} from '../../shared/components/app-alert/app-alert.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {emailValidator} from '../../shared/validators';
import {ERROR_MESSAGE} from '../../shared/data';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  public isVisible = false;
  public isnzFooter = null;
  public isnzClose = null;
  public isSuccess = true;
  public notClickable = true;
  public submitDisabled = true;
  public emailControl = new FormControl('', [Validators.required, emailValidator()]);
  public recoverForm = new FormGroup({
    email: this.emailControl,
  });
  public recoverFormError = {
    email: '',
    server: ''
  };

  constructor(
    // private pageAccessSvc: PageAccessService,
    private userSvc: UserService,
    private navigationSvc: NavigationService,
    ) {

  }

  ngOnInit() {

  }

  closeModal() {
    this.isVisible = false;
  }

  recoverPassword() {
    this.emailValidate();
    const email = this.emailControl.value;
    if (this.recoverForm.valid) {
      this.userSvc.recoverPwdSendMail(email).then(res => {
        this.submitDisabled = true;
        this.notClickable = true;
        this.isVisible = true;
      }, err => {
        if (err.error_code && err.error_code === 'email_unregistered') {
          this.recoverFormError.email = ERROR_MESSAGE.registerPage.emailUnRegistered;
        }
      });
    }
  }

  validateAll() {
    if (this.recoverForm.valid) {
      this.submitDisabled = false;
      this.notClickable = false;
    }
  }

  public emailValidate() {
    const errors = this.emailControl.errors;
    if (errors) {
      if (errors.required) {
        this.recoverFormError.email = ERROR_MESSAGE.common.required;
      } else if (errors.email) {
        this.recoverFormError.email = ERROR_MESSAGE.common.invalidEmail;
      }
    } else {
      this.recoverFormError.email = '';
    }
    this.validateAll();
  }
}
