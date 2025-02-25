import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPwComponent } from './auth/forgot-pw/forgot-pw.component';
import { MainPageComponent } from './main-page/main-page.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { authGuard } from './auth/guards/auth.guard';
import { PrivacyPolicyComponent } from './policy/privacy-policy/privacy-policy.component';
import { ImprintComponent } from './policy/imprint/imprint.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot-pw', component: ForgotPwComponent },
    { path: 'policy', component: PrivacyPolicyComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'main', component: MainPageComponent, canActivate: [authGuard] },
    { path: 'play/:id', component: VideoPlayerComponent, canActivate: [authGuard] },
];
