import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from '../pages/register/register.component';
import {HomeComponent} from '../pages/home/home.component';
import {GainDemandsComponent} from '../pages/gain-demands/gain-demands.component';
import {ReservationComponent} from '../pages/reservation/reservation.component';
import {LoginComponent} from '../pages/login/login.component';
import {IssueSecurityTokenComponent} from '../pages/issue-security-token/issue-security-token.component';
import {MetamaskGuideComponent} from '../pages/metamask-guide/metamask-guide.component';
import {PrivacyPolicyComponent} from '../pages/privacy-policy/privacy-policy.component';
import {TermsServiceComponent} from '../pages/terms-service/terms-service.component';
import {WhitelistComponent} from '../pages/whitelist/whitelist.component';
import {RecoverPasswordComponent} from '../pages/recover-password/recover-password.component';
import {ResetPasswordComponent} from '../pages/reset-password/reset-password.component';
import {ActivatedComponent} from '../pages/activated/activated.component';
import {OverdueComponent} from '../pages/overdue/overdue.component';
import {FaqComponent} from '../pages/faq/faq.component';
import {RegIntroductionComponent} from '../pages/reg-introduction/reg-introduction.component';
import {RequiredPreparationComponent} from '../pages/required-preparation/required-preparation.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: 'demands', component: GainDemandsComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'issue', component: IssueSecurityTokenComponent},
  {path: 'guide', component: MetamaskGuideComponent},
  {path: 'policy', component: PrivacyPolicyComponent},
  {path: 'service', component: TermsServiceComponent},
  {path: 'whitelist', component: WhitelistComponent},
  {path: 'recover', component: RecoverPasswordComponent},
  {path: 'reset', component: ResetPasswordComponent},
  {path: 'activated', component: ActivatedComponent},
  {path: 'overdue', component: OverdueComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'reg', component: RegIntroductionComponent},
  {path: 'upload', component: RequiredPreparationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
