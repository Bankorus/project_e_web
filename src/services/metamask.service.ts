import { Observable, BehaviorSubject } from 'rxjs-compat';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import { ApiService } from './api.service';
import {NavigationService} from './navigation.service';

@Injectable()
export class MetamaskService {
  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {
    if (apiService.getUserToken() != null) {
      // this.loginStatus.next(true);
    }
  }

  postTokenInfo(name, symbol, regs, start_date, tradeble_date, raise_in, amount_funds: number, hard_cap: number, controller_address, registry_address, token_address) {
    const obj = {
      name,
      symbol,
      regs,
      start_date,
      tradeble_date,
      raise_in,
      amount_funds,
      hard_cap,
      controller_address,
      registry_address,
      token_address
    };
    return this.apiService.postJSON('/sto/token-info/', obj).then((res) => {
      return res;
    });
  }

  getTokenInfo() {
    return this.apiService.getJSON('/sto/token-info/');
  }

  getWhitelistInfo(page: number) {
    if (page) {
      return this.apiService.getJSON(`/sto/white-list/?page=${page}`);
    } else {
      return this.apiService.getJSON('/sto/white-list/');
    }
  }

  addWhitelist(address, isUsaUser) {
    const obj = {
      address,
      isUsaUser
    };
    return this.apiService.postJSON('/sto/white-list/', obj).then((res) => {
      return res;
    });
  }

  importWhitelist(arr) {
    return this.apiService.postJSON('/sto/white-list/batch/', arr).then((res) => {
      return res;
    });
  }

  checkBadWord(word) {
    const obj = {
      word
    };
    return this.apiService.postJSON('/sto/checking-badword/', obj).then((res) => {
      return res;
    });
  }


}
