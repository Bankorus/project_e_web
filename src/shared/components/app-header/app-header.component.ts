import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {BaseService} from '../../../services/base.service';
import {NavigationService, UserService} from '../../../services';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private baseSvc: BaseService,
    private userSvc: UserService,
    private navigationSvc: NavigationService,
  ) {
    router.events.filter(itm => {
      return itm instanceof NavigationStart;
    }).subscribe(event => {
      this.email = this.baseSvc.getUserEmail();
      this.name = this.baseSvc.getUserName();
      this.status = this.baseSvc.getUserStatus();
      this.userSvc.isLogin().subscribe(res => {
        this.isLogin = res;
      });
    });
  }

  public email = '';
  public name = '';
  public status = '';
  public isLogin = false;
  public showPopupMenu = false;
  public isTransform = true;
  @ViewChild('orderLink') orderLink;
  @ViewChild('userLink') userLink;

  ngOnInit() {
  }

  showMenu() {
    this.showPopupMenu = true;
    this.isTransform = false;
  }

  hideMenu() {
    this.showPopupMenu = false;
    this.isTransform = true;
  }

  toReservation() {
    this.showPopupMenu = false;
    this.isTransform = true;
    this.navigationSvc.toReservation();
  }

  logOut() {
    this.showPopupMenu = false;
    this.isTransform = true;
    this.userSvc.logout();
  }

}
