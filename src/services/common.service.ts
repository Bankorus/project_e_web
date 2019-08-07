import { Injectable, ElementRef } from '@angular/core';
// import blockchain from '../assets/blockchain.js';

@Injectable()
export class CommonService {
  constructor() { }

  public chain: any;

  isGoogleCaptchaLoaded(elementRef: ElementRef) {
    return elementRef.nativeElement.querySelector('re-captcha>div iframe') != null;
  }

  formatNumberType(str, precision = 2) {
    str = str + '';
    str = str.replace(/[^\d.]/g, '')
      .replace(/^\./g, '')
      .replace(/\.{2,}/, '.')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
      .replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
    const regx = new RegExp('^(\\d+)\\.(\\d{' + precision + '}).*$');
    str = str.replace(regx, '$1.$2');
    return str;
  }

  formatBirthday(birthday: any) {
    if (typeof birthday === 'string') {
      return birthday;
    } else {
      const year = birthday.getFullYear();
      const month = (birthday.getMonth() + 1).toString().padStart(2, '0');
      const day = birthday.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }

  checkSecuritySetting(userInfo: object) {
    if (!userInfo['funds_password'] && !userInfo['otp_enabled']) {
      return {
        valid: false,
        msg: `For the safety of your transaction <br> please set up your Google authenritation and fund password`
      };
    } else if (userInfo['otp_enabled'] && !userInfo['funds_password']) {
      return {
        valid: false,
        msg: `For the safety of your transaction <br> please set up your  fund password`
      };
    } else if (!userInfo['otp_enabled'] && userInfo['funds_password']) {
      return {
        valid: false,
        msg: `For the safety of your transaction <br> please set up your  your Google authenritation`
      };
    } else if (userInfo['funds_password'] && userInfo['otp_enabled']) {
      return {
        valid: true
      };
    }
  }

  // getBlockChain() {
  //   if (this.chain && this.chain.initialized) {
  //     // console.log('already')
  //     return this.chain;
  //   } else {
  //     try {
  //       blockchain.initialize();
  //     } catch (err) {
  //       console.log('blockchain init fail', err);
  //     }
  //     this.chain = blockchain;
  //     return this.chain;
  //   }
  //   // return blockchain;
  // }

}
