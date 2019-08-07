import {Component, OnInit, TemplateRef} from '@angular/core';
import {MediaService, NavigationService, UserService} from '../../services';
import {NzNotificationService} from 'ng-zorro-antd';
import {environment} from '../../environments/environment';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-required-preparation',
  templateUrl: './required-preparation.component.html',
  styleUrls: ['./required-preparation.component.scss']
})
export class RequiredPreparationComponent implements OnInit {

  public presentation: string;
  public isIssueActive = false;
  public notClickable = true;
  public submitDisabled = true;
  public other: string;
  public isVisible = false;
  public isnzFooter = null;
  public isnzClose = null;
  public isSuccess = false;
  public isFailed = false;
  public isLeave = false;

  public briefError: string;
  public RaiseRange1Error: string;
  public RaiseRange2Error: string;
  public RaiseRange3Error: string;
  public extraInfoError: string;
  public isBrief = false;
  public range: string;
  public isRangeOne = true;
  public isRangeTwo = true;
  public isRangeThree = true;
  public isBriefLoading = false;
  public isRaiseRange1Loading = false;
  public isRaiseRange2Loading = false;
  public isRaiseRange3Loading = false;
  public isExtraInfoLoading = false;

  public briefBackList = [];
  public RaiseRange1List = [];
  public RaiseRange2List = [];
  public RaiseRange3List = [];
  public extraInfoList = [];
  public fileName: string;
  public bref_info: boolean;
  public range_category: string;
  public isBriefChecked = true;
  public isShow = false;

  constructor(
    private userSvc: UserService,
    private navigationSvc: NavigationService,
    private notification: NzNotificationService,
    private mediaService: MediaService
    ) {

  }

  ngOnInit() {
    this.getUploadFile();
    this.getUploadInfo();
  }

  getUploadInfo() {
    this.userSvc.getUploadInfo().then(res => {
      this.bref_info = res.bref_info;
      this.range_category = res.range_category;
      if (res.bref_info === true) {
        this.presentation = '0';
        this.isShow = true;
      } else if (res.bref_info === false) {
        this.presentation = '1';
        this.isShow = false;
      }
      if (res.range_category === 'RAISE_RANGE_1') {
        this.range = '1';
        this.isRangeOne = false;
        this.isRangeTwo = true;
        this.isRangeThree = true;
      } else if (res.range_category === 'RAISE_RANGE_2') {
        this.range = '2';
        this.isRangeOne = true;
        this.isRangeTwo = false;
        this.isRangeThree = true;
      } else if (res.range_category === 'RAISE_RANGE_3') {
        this.range = '3';
        this.isRangeOne = true;
        this.isRangeTwo = true;
        this.isRangeThree = false;
      }
      this.other = res.extra_info;
    });
  }

  downloadFile(id, name) {
    const url = environment.apiUrl + '/files/required-preparas/' + id;
    this.mediaService.get(url).then((res) => {
      saveAs(res.blob(), name);
    });
  }

  handleUpload($event, type) {
    if ($event.target.files && $event.target.files[0]) {
      const file = $event.target.files[0];
      const fName = file.name;
      this.imgUploadValidate(file, type, fName);
    }
  }

  fileUpload(file, type) {
    const postData = {
      file_category: type,
      file: file,
    };
    if (type === 'BRIEF') {
      this.isBriefLoading = true;
    } else if (type === 'RAISE_RANGE_1') {
      this.isRaiseRange1Loading = true;
    } else if (type === 'RAISE_RANGE_2') {
      this.isRaiseRange2Loading = true;
    } else if (type === 'RAISE_RANGE_3') {
      this.isRaiseRange3Loading = true;
    } else if (type === 'EXTRA_INFO') {
      this.isExtraInfoLoading = true;
    }
    this.userSvc.uploadFile(postData).then(res => {
      // console.log(res);
      const back = JSON.parse(res['_body']);
      if (type === 'BRIEF') {
        this.isBriefLoading = false;
        this.briefBackList = back;
      } else if (type === 'RAISE_RANGE_1') {
        this.isRaiseRange1Loading = false;
        this.RaiseRange1List = back;
      } else if (type === 'RAISE_RANGE_2') {
        this.isRaiseRange2Loading = false;
        this.RaiseRange2List = back;
      } else if (type === 'RAISE_RANGE_3') {
        this.isRaiseRange3Loading = false;
        this.RaiseRange3List = back;
      } else if (type === 'EXTRA_INFO') {
        this.isExtraInfoLoading = false;
        this.extraInfoList = back;
      }
    });
  }

  imgUploadValidate(imgFile: Blob, type: string, fName: string) {
    this.fileName = fName;
    if (imgFile && imgFile.size && imgFile.size <= 1024 * 1024 * 5) {
      if (type === 'BRIEF') {
        this.briefError = '';
      } else if (type === 'RAISE_RANGE_1') {
        this.RaiseRange1Error = '';
      } else if (type === 'RAISE_RANGE_2') {
        this.RaiseRange2Error = '';
      } else if (type === 'RAISE_RANGE_3') {
        this.RaiseRange3Error = '';
      } else if (type === 'EXTRA_INFO') {
        this.extraInfoError = '';
      }
      this.fileUpload(imgFile, type);
    } else if (imgFile && imgFile.size && imgFile.size > 1024 * 1024 * 5) {
      if (type === 'BRIEF') {
        this.briefError = 'The file cannot be larger than 10M.';
      } else if (type === 'RAISE_RANGE_1') {
        this.RaiseRange1Error = 'The file cannot be larger than 10M.';
      } else if (type === 'RAISE_RANGE_2') {
        this.RaiseRange2Error = 'The file cannot be larger than 10M.';
      } else if (type === 'RAISE_RANGE_3') {
        this.RaiseRange3Error = 'The file cannot be larger than 10M.';
      } else if (type === 'EXTRA_INFO') {
        this.extraInfoError = 'The file cannot be larger than 10M.';
      }
    }
  }

  remove(id, type) {
    this.userSvc.removeFile(id).then(res => {
      if (type === 'BRIEF') {
        this.deleteArr(this.briefBackList, id);
      } else if (type === 'RAISE_RANGE_1') {
        this.deleteArr(this.RaiseRange1List, id);
      } else if (type === 'RAISE_RANGE_2') {
        this.deleteArr(this.RaiseRange2List, id);
      } else if (type === 'RAISE_RANGE_3') {
        this.deleteArr(this.RaiseRange3List, id);
      } else if (type === 'EXTRA_INFO') {
        this.deleteArr(this.extraInfoList, id);
      }
    });
  }

  deleteArr(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
      }
    }
  }

  getUploadFile() {
    this.userSvc.getUploadFile().then(res => {
      this.briefBackList = res.BRIEF;
      this.RaiseRange1List = res.RAISE_RANGE_1;
      this.RaiseRange2List = res.RAISE_RANGE_2;
      this.RaiseRange3List = res.RAISE_RANGE_3;
      this.extraInfoList = res.EXTRA_INFO;
    });
  }

  submit() {
    this.validateOther();
    const extra_info = this.other;
    console.log(extra_info);
    this.userSvc.submitUploadInfo(this.bref_info, this.range_category, extra_info).then(res => {
      this.isVisible = true;
      this.isSuccess = true;
      setTimeout(() => {
        this.isVisible = false;
        this.isSuccess = false;
        this.navigationSvc.toIssue();
      }, 3000);
    }, err => {
      this.isVisible = true;
      this.isFailed = true;
      setTimeout(() => {
        this.isVisible = false;
        this.isFailed = false;
      }, 3000);
    });

  }

  validateBrief() {
    if (this.presentation === '0') {
      this.isBrief = false;
      this.bref_info = true;
      this.isShow = true;
    } else if (this.presentation === '1') {
      this.isBrief = true;
      this.bref_info = false;
      this.isShow = false;
    }
    this.validateOther();
  }

  validateFile() {
    if (this.range === '1') {
      this.isRangeOne = false;
      this.isRangeTwo = true;
      this.isRangeThree = true;
      this.range_category = 'RAISE_RANGE_1';
    } else if (this.range === '2') {
      this.isRangeOne = true;
      this.isRangeTwo = false;
      this.isRangeThree = true;
      this.range_category = 'RAISE_RANGE_2';
    } else if (this.range === '3') {
      this.isRangeOne = true;
      this.isRangeTwo = true;
      this.isRangeThree = false;
      this.range_category = 'RAISE_RANGE_3';
    }
    this.validateOther();
  }

  toReservation() {
    if (this.other || this.presentation || this.range) {
      this.isLeave = true;
    } else {
      this.navigationSvc.toReservation();
    }
  }

  leaveNow() {
    this.isLeave = false;
    this.navigationSvc.toReservation();
  }

  showNotification(template: TemplateRef<{}>): void {
    this.isIssueActive = true;
    this.notification.template(template);
  }

  closeNotification() {
    this.isIssueActive = false;
    this.notification.remove();
  }

  validateOther() {
    if (this.presentation && this.range) {
      this.notClickable = false;
      this.submitDisabled = false;
    }
  }

  closeSureModal() {
    this.isLeave = false;
  }

  removeBriefNotification() {
    this.isIssueActive = false;
    this.notification.remove();
  }

}
