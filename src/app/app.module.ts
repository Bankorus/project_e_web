import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ServicesModule} from '../services/services.module';
import {RegisterModule} from '../pages/register/register.module';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HomeModule } from '../pages/home/home.module';
import {AppHeaderModule} from '../shared/components/app-header/app-header.module';
import {AppFooterModule} from '../shared/components/app-footer/app-footer.module';
import {ImgBoxModule} from '../shared/components/img-box/img-box.module';
import {GainDemandsModule} from '../pages/gain-demands/gain-demands.module';
import {ReservationModule} from '../pages/reservation/reservation.module';
import {LoginModule} from '../pages/login/login.module';
import {IssueSecurityTokenModule} from '../pages/issue-security-token/issue-security-token.module';
import {MetamaskGuideModule} from '../pages/metamask-guide/metamask-guide.module';
import {PrivacyPolicyModule} from '../pages/privacy-policy/privacy-policy.module';
import {TermsServiceModule} from '../pages/terms-service/terms-service.module';
import {WhitelistModule} from '../pages/whitelist/whitelist.module';
import {RecoverPasswordModule} from '../pages/recover-password/recover-password.module';
import {ResetPasswordModule} from '../pages/reset-password/reset-password.module';
import {ActivatedModule} from '../pages/activated/activated.module';
import {OverdueModule} from '../pages/overdue/overdue.module';
import {FaqModule} from '../pages/faq/faq.module';
import {RegIntroductionModule} from '../pages/reg-introduction/reg-introduction.module';
import {RequiredPreparationModule} from '../pages/required-preparation/required-preparation.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    RegisterModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    AppHeaderModule,
    AppFooterModule,
    ImgBoxModule,
    GainDemandsModule,
    ReservationModule,
    LoginModule,
    IssueSecurityTokenModule,
    MetamaskGuideModule,
    PrivacyPolicyModule,
    TermsServiceModule,
    WhitelistModule,
    RecoverPasswordModule,
    ResetPasswordModule,
    ActivatedModule,
    OverdueModule,
    FaqModule,
    RegIntroductionModule,
    RequiredPreparationModule
  ],
  providers: [
    CookieService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzDuration: 0, nzMaxStack: 1 }}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
