import { Component } from '@angular/core';
import {NavigationService, UnauthorizationSubject, ServerErrorSubject} from '../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projectE';
  showServerError = false;
  serverErrorMsg: string;

  constructor(private navigationSvc: NavigationService) {
    UnauthorizationSubject.subscribe({
      next: (res) => {
        this.navigationSvc.toLogin();
      }
    });

    ServerErrorSubject.subscribe({
      next: (res) => {
        this.showServerError = true;
        this.serverErrorMsg = res['errorMsg'];
        setTimeout(() => {
          this.showServerError = false;
          this.serverErrorMsg = '';
        }, 5000);
      }
    });

  }
}
