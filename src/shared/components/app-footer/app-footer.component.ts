import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../../services';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {

  constructor(
    private navigationSvc: NavigationService,
    private router: Router
  ) {
    // router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     const url = event.url.split('?')[0];
    //     this.shown = this.navigationSvc.notShowHeaderUrls.indexOf(url) === -1;
    //   }
    // });
  }

  ngOnInit() {
  }

  goto(url) {
    this.router.navigateByUrl(url);
  }

}
