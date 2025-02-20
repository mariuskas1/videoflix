import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPwComponent } from './auth/forgot-pw/forgot-pw.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot-pw', component: ForgotPwComponent },
    { path: 'main', component: MainPageComponent },
];
