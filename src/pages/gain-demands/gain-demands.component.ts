import { Component, OnInit } from '@angular/core';
import {NavigationService, UserService} from '../../services';
import { NzModalService } from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {areaCodeValidator, emailValidator, firstNameValidator, lastNameValidator, phoneValidator} from '../../shared/validators';
import {ERROR_MESSAGE} from '../../shared/data';
// import {AppAlertService} from '../../shared/components/app-alert/app-alert.service';

@Component({
  selector: 'app-demands',
  templateUrl: './gain-demands.component.html',
  styleUrls: ['./gain-demands.component.scss']
})
export class GainDemandsComponent implements OnInit {

  public isVisible = false;
  public isnzFooter = null;
  public isnzClose = null;
  public isSuccess = false;

  public fname: string;
  public lname: string;
  public email: string;
  public code: string;
  public phone: string;
  public counsel: boolean;
  public counselValue: string;
  public capital: boolean;
  public jurisdiction: string;
  public business: string;
  public raise: string;
  public time: string;
  public where: string;
  public budget: string;

  public notClickable = true;
  public submitDisabled = true;
  public isJurisdictionTransform = false;
  public isBusinessTransform = false;
  public isRaiseTransform = false;
  public isTimeTransform = false;
  public isWhereTransform = false;
  public isBudgetTransform = false;

  // public firstnameControl = new FormControl('');
  // public lastnameControl = new FormControl('');
  // public emailControl = new FormControl('');
  // public codeControl = new FormControl('');
  // public phoneControl = new FormControl('');
  public companyControl = new FormControl('', [Validators.required]);
  public jurisdictionControl = new FormControl('', [Validators.required]);
  public businessControl = new FormControl('', [Validators.required]);
  public counselControl = new FormControl('', [Validators.required]);
  public counselValueControl = new FormControl('', [Validators.required]);
  public raiseControl = new FormControl('', [Validators.required]);
  public capitalControl = new FormControl('', [Validators.required]);
  public whereControl = new FormControl('', [Validators.required]);
  public timeControl = new FormControl('', [Validators.required]);
  public budgetControl = new FormControl('', [Validators.required]);
  public demandsForm = new FormGroup({
    // firstname: this.firstnameControl,
    // lastname: this.lastnameControl,
    // code: this.codeControl,
    // phone: this.phoneControl,
    // email: this.emailControl,
    company: this.companyControl,
    jurisdiction: this.jurisdictionControl,
    business: this.businessControl,
    counsel: this.counselControl,
    counselValue: this.counselValueControl,
    raise: this.raiseControl,
    capital: this.capitalControl,
    where: this.whereControl,
    time: this.timeControl,
    budget: this.budgetControl
  });
  public demandsFormError = {
    company: '',
    jurisdiction: '',
    business: '',
    counsel: '',
    counselValue: '',
    raise: '',
    capital: '',
    where: '',
    time: '',
    budget: '',
    server: ''
  };

  constructor(
    // private pageAccessSvc: PageAccessService,
    private userSvc: UserService,
    private navigationSvc: NavigationService,
    ) {

  }

  ngOnInit() {
    this.getUserProfile();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getUserProfile() {
    this.userSvc.getUserProfile().then(res => {
      // console.log('user_profile', res);
      this.fname = res.first_name;
      this.lname = res.last_name;
      this.email = res.email;
      this.code = res.areacode;
      this.phone = res.phonenum;
    });
  }

  submitForm() {
    if (this.demandsForm.valid) {
      this.gainDemands();
    } else {
      for (const key in this.demandsFormError) {
        if (key) {
          this.ValidateField(key);
        }
      }
    }
  }

  gainDemands() {
    const company = this.companyControl.value;
    const jurisdiction = this.jurisdictionControl.value;
    const business = this.businessControl.value;
    const counsel = this.counselControl.value;
    const counselValue = this.counselValueControl.value;
    const raise = this.raiseControl.value;
    const capitalV = this.capitalControl.value;
    const where = this.whereControl.value;
    const time = this.timeControl.value;
    const budget = this.budgetControl.value;
    this.userSvc.gainDemands(company, jurisdiction, business, counsel, counselValue, raise, capitalV, where, time, budget).then(res => {
      // console.log(res);
      this.isVisible = true;
      this.isSuccess = true;
      setTimeout(() =>  {
        this.isVisible = false;
        this.navigationSvc.toReservation();
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

  validateCounsel() {
    if (this.counselControl.value === true) {
      this.demandsForm.addControl('counselValue', this.counselValueControl);
    } else {
      if (this.demandsForm.controls && this.demandsForm.controls['counselValue']) {
        this.demandsForm.removeControl('counselValue');
      }
    }
  }

  validateAll() {
    if (this.demandsForm.valid) {
      this.submitDisabled = false;
      this.notClickable = false;
    }
  }

  ValidateField(fieldName: string) {
    const control = this.demandsForm.get(fieldName);
    if (control && !control.valid) {
      if (control.errors.required) {
        this.demandsFormError[fieldName] = ERROR_MESSAGE.common.required;
      } else if (control.errors.maxlength) {
        this.demandsFormError[fieldName] = ERROR_MESSAGE.common.maxLength;
      } else if (control.errors.valueValid) {
        this.demandsFormError[fieldName] = control.value + ERROR_MESSAGE.common.validChoice;
      } else if (control.errors.email) {
        this.demandsFormError[fieldName] = ERROR_MESSAGE.common.invalidEmail;
      }
    }
    if (control && control.valid) {
      this.demandsFormError[fieldName] = '';
    }
    this.validateAll();
  }

  companyValidate() {
    const errors = this.companyControl.errors;
    if (errors) {
      if (errors.required) {
        this.demandsFormError.company = ERROR_MESSAGE.common.required;
      }
    } else {
      this.demandsFormError.company = '';
    }
    this.validateAll();
  }

  // typeCounselValidate() {
  //   const errors = this.counselValueControl.errors;
  //   if (errors) {
  //     if (errors.required) {
  //       this.demandsFormError.counselValue = ERROR_MESSAGE.common.required;
  //     }
  //   } else {
  //     this.demandsFormError.counselValue = '';
  //   }
  //   this.validateAll();
  // }

  transform(type) { // ui非要用自己的箭头！
    if (type === 'jurisdiction') {
      this.isJurisdictionTransform = !this.isJurisdictionTransform;
    } else if (type === 'business') {
      this.isBusinessTransform = !this.isBusinessTransform;
    } else if (type === 'raise') {
      this.isRaiseTransform = !this.isRaiseTransform;
    } else if (type === 'time') {
      this.isTimeTransform = !this.isTimeTransform;
    } else if (type === 'where') {
      this.isWhereTransform = !this.isWhereTransform;
    } else if (type === 'budget') {
      this.isBudgetTransform = !this.isBudgetTransform;
    }
  }

}
