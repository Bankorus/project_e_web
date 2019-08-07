import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metamask-guide',
  templateUrl: './metamask-guide.component.html',
  styleUrls: ['./metamask-guide.component.scss']
})
export class MetamaskGuideComponent implements OnInit {

  public isVisible = false;
  public isnzFooter = null;
  public isnzClose = null;
  public isSuccess = false;
  public isFailed = false;
  public isLoading = false;

  constructor() {

  }

  ngOnInit() {

  }

}
