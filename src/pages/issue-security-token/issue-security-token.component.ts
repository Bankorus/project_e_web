import { Component, OnInit, TemplateRef } from '@angular/core';
import {NavigationService, UserService, BlockchainService, MetamaskService} from '../../services';
import { NzNotificationService } from 'ng-zorro-antd';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ERROR_MESSAGE} from '../../shared/data';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
  selector: 'app-issue-security-token',
  templateUrl: './issue-security-token.component.html',
  styleUrls: ['./issue-security-token.component.scss']
})
export class IssueSecurityTokenComponent implements OnInit {

  public isSymbolsActive: boolean;
  public isRegulationsActive: boolean;
  public isVisible: boolean;
  public isStatusVisible: boolean;
  public isnzFooter = null;
  public isnzClose = null;
  public isSuccess: boolean;
  public isFailed: boolean;
  public isLoading: boolean;
  public failedError: string;
  public isRegulationTransform = false;
  public isRaiseTransform = false;

  public raise: string;
  public symbol: string;
  public coin: string;
  public number: string;
  public amount: string;
  public cap: string;
  public endDate: any;
  public amountError: string;
  public capError: string;
  public notClickable = true;
  public submitDisabled = true;
  today = new Date();
  public regs: string;
  public regS: boolean;
  public regD: boolean;
  public regD504: boolean;
  public regD506b: boolean;
  public regD506c: boolean;
  public hasNumber: boolean;

  public symbolControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  public nameControl = new FormControl('', [Validators.required]);
  public regulationControl = new FormControl('', [Validators.required]);
  public startDateControl = new FormControl('', [Validators.required]);
  public endDateControl = new FormControl('');
  public raiseControl = new FormControl('', [Validators.required]);
  public amountControl = new FormControl('', [Validators.required]);
  public capControl = new FormControl('', [Validators.required]);
  public agreeControl = new FormControl(false, [Validators.requiredTrue]);
  public issueForm = new FormGroup({
    symbol: this.symbolControl,
    name: this.nameControl,
    regulation: this.regulationControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
    raise: this.raiseControl,
    amount: this.amountControl,
    cap: this.capControl,
    agree: this.agreeControl
  });
  public issueFormError = {
    symbol: '',
    name: '',
    regulation: '',
    startDate: '',
    endDate: '',
    raise: '',
    amount: '',
    cap: '',
    agree: '',
    server: ''
  };

  constructor(
    private userSvc: UserService,
    private navigationSvc: NavigationService,
    private notification: NzNotificationService,
    private blockChainSvc: BlockchainService,
    private metaMaskSvc: MetamaskService,
    ) {
    this.isSymbolsActive = false;
    this.isRegulationsActive = false;
  }

  ngOnInit() {
    this.regS = true;
    this.regD = false;
    this.regD504 = true;
    this.regD506b = false;
    this.regD506c = false;
  }

  getBlockChain() {
    const networkId = 3;
    const name = this.nameControl.value;
    const symbol = this.symbolControl.value;
    const totalSupply: number = Number(this.cap);
    const time = (Date.parse(this.startDateControl.value) / 1000);
    const startAt = time;
    const tradeble_date = (Date.parse(this.endDateControl.value) / 1000);
    const regsB = this.regulationControl.value;
    if (regsB === 'Rule 504 of Reg-D') {
      this.regs = 'Reg-D-504';
    } else if (regsB === 'Reg-S') {
      this.regs = 'Reg-S';
    } else if (regsB === 'Rule 506b of Reg-D') {
      this.regs = 'Reg-D-506b';
    } else if (regsB === 'Rule 506c of Reg-D') {
      this.regs = 'Reg-D-506c';
    }
    const amountFund: number = Number(this.amount);
    const currency = this.raiseControl.value;
    this.isStatusVisible = true;
    this.isLoading = true;
    // console.log(typeof(totalSupply), typeof(amountFund));
    this.blockChainSvc.initialize(networkId).then(res => {
      // console.log('startAt====', startAt);
      this.blockChainSvc.create(name, symbol, totalSupply, startAt, this.regs, amountFund, currency).then(result => {
        // console.log('create result====', result);
        const [controller, registry, token] = result;
        this.metaMaskSvc.postTokenInfo(name, symbol, this.regs, startAt, tradeble_date, currency, amountFund, totalSupply, controller, registry, token).then(back => {
          // console.log('send backend success', back);
          this.isLoading = false;
          this.isFailed = false;
          this.isSuccess = true;
          setTimeout(() => {
            this.isStatusVisible = false;
            this.navigationSvc.toWhiteList();
          }, 5000);
        });
      }, err => {
        console.log('create error====', err);
      });
    }, err => {
      this.isLoading = false;
      this.isFailed = false;
      this.isSuccess = false;
      console.log('initialize error====', err);
      if (err.toString().indexOf('metamask_not_found') > -1) {
        this.isStatusVisible = false;
        this.navigationSvc.toMetaMaskGuidePage();
      } else if (err.toString().indexOf('not_avaiable_account') > -1) {
        this.isLoading = false;
        this.isFailed = true;
        this.failedError = 'Please register or login your MetaMask.';
        setTimeout( () => {
          this.isStatusVisible = false;
          this.isSuccess = false;
          this.isFailed = false;
        }, 5000);
        // this.navigationSvc.toWhiteList();
      }
    });
  }

  createSymbolNotification(template: TemplateRef<{}>): void {
    this.isSymbolsActive = true;
    this.isRegulationsActive = false;
    this.notification.template(template);
  }

  closeSymbolNotification() {
    this.isSymbolsActive = false;
    this.notification.remove();
  }

  createRegulationNotification(notification: TemplateRef<{}>): void {
    this.isRegulationsActive = true;
    this.isSymbolsActive = false;
    this.notification.template(notification);
  }

  closeRegulationNotification() {
    this.isRegulationsActive = false;
    this.notification.remove();
  }

  lanchModal() {
    if (this.issueForm.valid) {
      this.submitValidate();
    } else {
      for (const key in this.issueFormError) {
        if (key) {
          this.ValidateField(key);
        }
      }
    }
  }

  submitValidate() {
    this.symbolValidate();
    this.nameValidate();
    this.amountValidate();
    this.capValidate();
    this.agreeCheckValidate();
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  LaunchTo() {
    this.isVisible = false;
    this.getBlockChain();
  }

  changeCoin() {
    this.coin = this.raiseControl.value;
    this.amountValidate();
    this.capValidate();
  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 1;
  }

  addDate(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    const m = d.getMonth() + 1;
    return d.getFullYear() + '-' + m + '-' + d.getDate();
  }

  onChange(v) {
    if (v) {
      if (v === 'Reg-S') {
        this.endDate = this.addDate(this.startDateControl.value, 40);
      } else if (v === 'Rule 504 of Reg-D' || v === 'Rule 506b of Reg-D' || v === 'Rule 506c of Reg-D') {
        this.endDate = this.addDate(this.startDateControl.value, 365);
      }
    }
  }

  changeEndDate() {
    const start = this.startDateControl.value;
    const regulation = this.regulationControl.value;
    if (start) {
      if (regulation === 'Reg-S') {
        this.endDate = this.addDate(start, 40);
      } else if (regulation === 'Rule 504 of Reg-D' || regulation === 'Rule 506b of Reg-D' || regulation === 'Rule 506c of Reg-D') {
        this.endDate = this.addDate(start, 365);
      }
    }
  }

  validateAll() {
    if (this.issueForm.valid) {
      this.submitDisabled = false;
      this.notClickable = false;
    } else {
      this.submitDisabled = true;
      this.notClickable = true;
    }
  }

  nameValidate() {
    const errors = this.nameControl.errors;
    if (errors) {
      if (errors.required) {
        this.issueFormError.name = ERROR_MESSAGE.common.required;
      } else if (errors.minlength) {
        this.issueFormError.name = ERROR_MESSAGE.common.symbolLength;
      } else if (errors.maxlength) {
        this.issueFormError.name = ERROR_MESSAGE.common.symbolLength;
      }
    } else {
      this.issueFormError.name = '';
    }
    this.validateAll();
  }

  symbolValidate() {
    const errors = this.symbolControl.errors;
    if (errors) {
      if (errors.required) {
        this.issueFormError.symbol = ERROR_MESSAGE.common.required;
      } else if (errors.minlength) {
        this.issueFormError.symbol = ERROR_MESSAGE.common.symbolLength;
      } else if (errors.maxlength) {
        this.issueFormError.symbol = ERROR_MESSAGE.common.symbolLength;
      }
    } else {
      this.checkBadWord();
    }
    this.validateAll();
  }

  checkBadWord() {
    this.metaMaskSvc.checkBadWord(this.symbol).then(res => {
      this.issueFormError.symbol = '';
    }, err => {
      if (err.error_code && err.error_code === 'serializer_validation_error') {
        this.issueFormError.symbol = this.symbol + ' is not allowed';
      }
    });
  }

  amountValidate() {
    const reg = /[0-9]/g;
    if (this.amount) {
      if (!reg.test(this.amount)) {
        this.amountError = ERROR_MESSAGE.common.formatError;
      } else {
        this.amountError = '';
      }
    }
    if (this.cap && this.amount && this.raiseControl.value) {
      this.hasNumber = true;
      this.number = (Number(this.amount) / Number(this.cap)).toFixed(8);
    } else {
      this.hasNumber = false;
    }
  }

  amountOnlyNumber() {
    this.amount = this.amount.replace(/[^\d]/g, '');
  }

  capOnlyNumber() {
    this.cap = this.cap.replace(/[^\d]/g, '');
  }

  ValidateField(fieldName: string) {
    const control = this.issueForm.get(fieldName);
    if (control && !control.valid) {
      if (control.errors.required) {
        this.issueFormError[fieldName] = ERROR_MESSAGE.common.required;
      } else if (control.errors.maxlength) {
        this.issueFormError[fieldName] = ERROR_MESSAGE.common.maxLength;
      } else if (control.errors.valueValid) {
        this.issueFormError[fieldName] = control.value + ERROR_MESSAGE.common.validChoice;
      } else if (control.errors.email) {
        this.issueFormError[fieldName] = ERROR_MESSAGE.common.invalidEmail;
      }
    }
    if (control && control.valid) {
      this.issueFormError[fieldName] = '';
    }
    this.validateAll();
  }

  agreeCheckValidate() {
    if (this.agreeControl.value === false) {
      this.issueFormError.agree = ERROR_MESSAGE.registerPage.unconfirmTerms;
    } else {
      this.issueFormError.agree = '';
    }
    this.validateAll();
  }

  agreeCheckChange() {
    this.agreeCheckValidate();
  }

  changeReg(reg: string) {
    if (reg === 's') {
        this.regS = true;
        this.regD = false;
    } else if (reg === 'd') {
      this.regS = false;
      this.regD = true;
    }
  }

  changeRegRule(rule: string) {
    if (rule === 'regD504') {
      this.regD504 = true;
      this.regD506b = false;
      this.regD506c = false;
    } else if (rule === 'regD506b') {
      this.regD504 = false;
      this.regD506b = true;
      this.regD506c = false;
    } else if (rule === 'regD506c') {
      this.regD504 = false;
      this.regD506b = false;
      this.regD506c = true;
    }
  }

  toReg() {
    this.notification.remove();
    this.navigationSvc.toReg();
  }

  capValidate() {
    const reg = /[0-9]/;
    if (this.cap) {
      if (!reg.test(this.cap)) {
        this.capError = ERROR_MESSAGE.common.formatError;
      } else {
        this.capError = '';
      }
    }
    if (this.cap && this.amount && this.raiseControl.value) {
      this.hasNumber = true;
      this.number = (Number(this.amount) / Number(this.cap)).toFixed(8);
    } else {
      this.hasNumber = false;
    }
  }

  removeSymbolNotification() {
    this.isSymbolsActive = false;
    this.notification.remove();
  }

  removeRegNotification() {
    this.isRegulationsActive = false;
    this.notification.remove();
  }

  toService() {
    this.navigationSvc.toService();
  }

  transform(type) { // ui非要用自己的箭头！
    if (type === 'regulation') {
      this.isRegulationTransform = !this.isRegulationTransform;
    } else if (type === 'raise') {
      this.isRaiseTransform = !this.isRaiseTransform;
    }
  }
}
