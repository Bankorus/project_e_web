import {Component, Input, Output, EventEmitter, SimpleChanges, SimpleChange, OnChanges} from '@angular/core';

import { MediaService } from '../../../services';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-img-box',
  templateUrl: './img-box.component.html',
  styleUrls: ['./img-box.component.scss']
})
export class ImgBoxComponent implements OnChanges {
  @Input() href: string;
  dataUrl: any;
  blob: any;
  @Output() fileDownload = new EventEmitter();

  constructor(private mediaService: MediaService) {}

  ngOnChanges(changes: SimpleChanges) {
    const href: SimpleChange = changes.href;
    // console.log('href', href);
    if (href && href.currentValue) {
      // console.log(href.currentValue);
      this.mediaService.get(href.currentValue).then((res) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.dataUrl = fileReader.result;
          this.blob = res.blob();
        };
        fileReader.readAsDataURL(res.blob());
      });
    }
  }

  downloadFile() {
    saveAs(this.blob);
  }

}
