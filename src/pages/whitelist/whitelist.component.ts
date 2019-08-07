import { Component, OnInit, TemplateRef } from '@angular/core';
import {NavigationService, MetamaskService, BlockchainService, UserService} from '../../services';
import { NzMessageService, UploadFile, NzNotificationService } from 'ng-zorro-antd';
import {ERROR_MESSAGE} from '../../shared/data';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.scss']
})
export class WhitelistComponent implements OnInit {

  public dataSet = [];
  public hasData: boolean;
  public isVisible = false;
  public isAddVisible = false;
  public isImportVisible = false;
  public isTransferVisible = false;
  public isSureImportVisible = false;
  public isnzFooter = null;
  public isnzClose = null;
  public isSuccess = false;
  public isFailed = false;
  public isLoading = false;
  public isTransferSuccess = false;
  public isTransferLoading = false;
  public failedError: string;
  loading = true;
  avatarUrl: string;
  public isSymbolsActive = false;
  public isSureVisible = false;
  public isIssueActive = false;

  public address: string;
  public amount: string;
  public amountError: string;
  public country: any;
  public countryError: string;
  public add: string;
  public addAddressError: string;
  public importError: string;
  public error: string;

  public raise_in: string;
  public hard_cap: number;
  public regulation: string;
  public tokenAddress: string;
  public symbol: string;
  public name: string;
  public for_usa: string;
  public for_others: string;
  public total: number;
  public pageIndex = 1;

  public importListArray = [];
  public isImport = false;
  public fileName: string;
  public fileArray: [];
  public csv: any;


  constructor(
    private navigationSvc: NavigationService,
    private msg: NzMessageService,
    private notification: NzNotificationService,
    private metaMaskSvc: MetamaskService,
    private blockChainSvc: BlockchainService,
    private userSvc: UserService,
    ) {

  }

  ngOnInit() {
    this.getTokenInfo();
    this.getWhitelist(1);
    this.initBlockChain();
  }

  initBlockChain() {
    const networkId = 3;
    this.blockChainSvc.initialize(networkId).then(res => {

    }, err => {
      this.isLoading = false;
      this.isFailed = false;
      this.isSuccess = false;
      console.log('initialize error====', err);
      if (err.toString().indexOf('metamask_not_found') > -1) {
        this.isVisible = false;
        this.navigationSvc.toMetaMaskGuidePage();
      } else if (err.toString().indexOf('not_avaiable_account') > -1) {
        this.isLoading = false;
        this.isFailed = true;
        this.failedError = 'Please register or login your MetaMask.';
        setTimeout( () => {
          this.isVisible = false;
          this.isSuccess = false;
          this.isFailed = false;
        }, 5000);
      }
      // else {
      //   this.isLoading = false;
      //   this.isFailed = true;
      //   this.failedError = 'Please try again later.';
      //   setTimeout( () => {
      //     this.isVisible = false;
      //     this.isSuccess = false;
      //     this.isFailed = false;
      //   }, 5000);
      // }
      // else if (err.toString().indexOf('metamask_not_found') > -1) {
      //   this.isStatusVisible = true;
      //   this.isLoading = false;
      //   this.isFailed = true;
      //   this.failedError = 'Oops, the business is too busy at present, please try again later.';
      //   setTimeout( () => {
      //     this.isStatusVisible = false;
      //   }, 5000);
      // }
      // else if (err.toString().indexOf('metamask_not_found') > -1) {
      //   this.isStatusVisible = true;
      //   this.isLoading = false;
      //   this.isFailed = true;
      //   this.failedError = 'Please use Main Ethereum Network in Metamask.';
      //   setTimeout( () => {
      //     this.isStatusVisible = false;
      //   }, 5000);
      // }
      // else if (err.toString().indexOf('metamask_not_found') > -1) {
      //   this.isStatusVisible = true;
      //   this.isLoading = false;
      //   this.isFailed = true;
      //   this.failedError = 'Sorry, your gas fee is insufficient. Please add the gas fee and try again. ';
      //   setTimeout( () => {
      //     this.isStatusVisible = false;
      //   }, 5000);
      // }
    });
  }

  getTokenInfo() {
    this.metaMaskSvc.getTokenInfo().then(res => {
      this.raise_in = res.raise_in;
      this.hard_cap = res.hard_cap;
      this.regulation = res.regs;
      this.tokenAddress = res.token_address;
      this.symbol = res.symbol;
      this.name = res.name;
      this.for_usa = res.for_usa;
      this.for_others = res.for_others;
    });
  }

  getWhitelist(page) {
    this.metaMaskSvc.getWhitelistInfo(page).then(res => {
      if (res.results.length >= 1) {
        this.hasData = true;
        this.dataSet = res.results;
        this.total = res.count;
      } else {
        this.hasData = false;
        this.dataSet = [];
      }
    });
  }

  pagination(page) {
    this.getWhitelist(page);
  }

  addToBlock() {
    this.isSureVisible = false;
    const a = {'true': true, 'false': false};
    const address = this.add;
    const isUsaUser = a[this.country];
    const obj = {
      address: address,
      isUsaUser: isUsaUser
    };
    this.isVisible = true;
    this.isLoading = true;
    this.blockChainSvc.addInvestor(obj).then(result => {
      this.metaMaskSvc.addWhitelist(address, isUsaUser).then(back => {
        this.isLoading = false;
        this.isFailed = false;
        this.isSuccess = true;
        this.isSureVisible = false;
        setTimeout(() => {
          this.isVisible = false;
          this.isSuccess = false;
        }, 5000);
        this.getWhitelist(1);
      });
    }, err => {
      console.log('add investor error====', err);
      if (err.toString().indexOf('not_avaiable_account') > -1) {
        this.isLoading = false;
        this.isVisible = true;
        this.isFailed = true;
        this.failedError = 'Please register or login your MetaMask.Then refresh the browser';
        setTimeout( () => {
          this.isVisible = false;
          this.isFailed = false;
          this.initBlockChain();
        }, 5000);
      }
    });
  }

  addNew() {
    this.isAddVisible = true;
  }

  addInvestor() {
    this.validateAdd();
    if (this.add && this.validateRadio()) {
      this.isSureVisible = true;
      this.isAddVisible = false;
    }
  }

  validateAdd() {
    if (this.add) {
      this.addAddressError = '';
    } else {
      this.addAddressError = 'This field is required.';
    }
  }

  validateRadio() {
    if ([true, false].indexOf(this.country) === -1) {
      this.countryError = 'This field is required.';
      return false;
    } else {
      this.countryError = '';
      return true;
    }
  }

  closeSureModal() {
    this.isSureVisible = false;
    this.isSureImportVisible = false;
  }

  closeAddModal() {
    this.isAddVisible = false;
  }

  closeTransferModal() {
    this.isTransferVisible = false;
  }

  importList() {
    this.isImportVisible = true;
  }

  importInvestor() {
    if (this.csv) {
      this.isSureImportVisible = true;
      this.isImportVisible = false;
      this.importError = '';
    } else {
      this.importError = 'This field is required.';
    }
  }

  closeImportModal() {
    this.isImportVisible = false;
  }

  showNotification(template: TemplateRef<{}>): void {
    this.isIssueActive = true;
    this.notification.template(template);
  }

  closeNotification() {
    this.isIssueActive = false;
    this.notification.remove();
  }

  removeBriefNotification() {
    this.isIssueActive = false;
    this.notification.remove();
  }

  transferUp() {
    if (this.address) {
      this.isTransferVisible = true;
      this.error = '';
    } else {
      this.error = 'This field is required.';
    }
  }

  inputAddressValidate() {
    if (this.address) {
      this.error = '';
    } else {
      this.error = 'This field is required.';
    }
  }

  transferDown(item) {
    this.isTransferVisible = true;
    this.address = item;
  }

  amountValidate() {
    const reg = /[0-9]/;
    if (this.amount) {
      if (!reg.test(this.amount)) {
        this.amountError = ERROR_MESSAGE.common.formatError;
      } else {
        this.amountError = '';
      }
    }
  }

  amountRequired() {
    if (this.amount) {
      this.amountError = '';
    } else {
      this.amountError = 'This field is required.';
    }
  }

  clickTransfer() {
    this.amountRequired();
    const address = this.address;
    const amount = Number(this.amount);
    if (this.address && this.amount && this.amountError === '') {
      this.isTransferVisible = false;
      this.isVisible = true;
      this.isTransferLoading = true;
      this.blockChainSvc.transfer(address, amount).then(res => {
        this.isTransferLoading = false;
        this.isTransferSuccess = true;
        setTimeout( () => {
          this.isVisible = false;
          this.isTransferSuccess = false;
          this.isTransferSuccess = false;
        }, 5000);
      }, err => {
        // console.log('transfer err====', err);
        // this.isTransferLoading = false;
        // this.isTransferSuccess = false;
        // this.isFailed = true;
        // this.failedError = 'Please try again later.';
        // setTimeout( () => {
        //   this.isVisible = false;
        //   this.isFailed = false;
        // }, 5000);
        if (err.toString().indexOf('not_avaiable_account') > -1) {
          this.isTransferLoading = false;
          this.isVisible = true;
          this.isFailed = true;
          this.failedError = 'Please register or login your MetaMask.Then refresh the browser.';
          setTimeout( () => {
            this.isVisible = false;
            this.isFailed = false;
            this.initBlockChain();
          }, 5000);
        }
      });
    }
  }

  handleUpload($event) {
    if ($event.target.files && $event.target.files[0]) {
      const file = $event.target.files[0];
      this.fileName = file.name;
      const postData = {
        csv_file: file,
      };
      this.userSvc.importFile(postData).then(res => {
        this.importError = '';
        this.importListArray.push(this.fileName);
        this.fileArray = JSON.parse(res['_body']);
        // this.importToBlock(this.fileArray);
      }, err => {
        const obj = JSON.parse(err);
        if (obj.error_code && obj.error_code === 'parse_csv_error') {
          this.importError = 'Parse CSV File Error';
        }
      });
    }
  }

  importToBlock() {
    const arr = this.fileArray;
    this.isSureImportVisible = false;
    this.isImportVisible = false;
    this.isVisible = true;
    this.isLoading = true;
    this.blockChainSvc.addInvestors(arr).then(result => {
      this.metaMaskSvc.importWhitelist(arr).then(back => {
        this.isLoading = false;
        this.isFailed = false;
        this.isSuccess = true;
        this.isSureImportVisible = false;
        setTimeout(() => {
          this.isVisible = false;
          this.isSuccess = false;
        }, 5000);
        this.getWhitelist(1);
      });
    }, err => {
      console.log('add investor error====', err);
      if (err.toString().indexOf('not_avaiable_account') > -1) {
        this.isLoading = false;
        this.isVisible = true;
        this.isFailed = true;
        this.failedError = 'Please register or login your MetaMask.Then refresh the browser';
        setTimeout( () => {
          this.isVisible = false;
          this.isFailed = false;
          this.initBlockChain();
        }, 5000);
      }
    });
  }

}
