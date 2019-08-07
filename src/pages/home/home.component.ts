import { Component, OnInit } from '@angular/core';
import {CommonService, NavigationService} from '../../services';
import { BlockchainService, Investor } from '../../services/blockchain.service';
// import blockchain from '../../assets/blockchain.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    // private pageAccessSvc: PageAccessService,
    // private userSvc: UserService,
    private navigationSvc: NavigationService,
    private  commonSvc: CommonService
    ) {

  }

  ngOnInit() {
    // console.log('home');
    // const blockchain = new BlockchainService();
    // blockchain.initialize(3)
    //   .then(() => console.log(`${blockchain.networkId} ${blockchain.account}`))
    //   .then(() => blockchain.transfer("0x5215D68847111E1afB16224ff81203B6041a988b", 100));
  }

  toStart() {
    this.navigationSvc.toRegister();
  }

  toFAQ() {
    this.navigationSvc.toFAQ();
  }

}
