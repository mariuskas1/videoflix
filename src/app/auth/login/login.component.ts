import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword = false;
  loginFailed = false;
  rememberUser = false;

  showToastMessage = false;
  toastMessage = 'Your account has not yet been activated. Please check your inbox and click on the activation link.'

  loginURL = 'https://marius-kasparek.developerakademie.org/videoflix_server/api/login/';

  loginData = {
    email: '',
    password: ''
  };
  

  constructor(private router: Router) {}



  ngOnInit(){
    this.checkLocalStorageForRememberedUser();
  }


  checkLocalStorageForRememberedUser(){
    const rememberedUserData = JSON.parse(localStorage.getItem('vfRememberedUserData') || '{}');
    if(rememberedUserData && rememberedUserData.token){
      localStorage.setItem('vfUserData', JSON.stringify(rememberedUserData));
      this.router.navigate(['/main']);
    }
  }


  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }


  toggleRememberUser(event:Event){
    const target = event.target as HTMLInputElement;
    this.rememberUser = target.checked;
  }


  async logIn(){
    try {
      const response = await fetch(this.loginURL, this.getLoginRequest());
      const responseData = await response.json();

      if(response.ok && responseData.token){
        this.handleSuccesfulLogin(responseData);
      } else{
        this.handleFailedLogin(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  }


  getLoginRequest(){
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.loginData)
    };
  }


  handleSuccesfulLogin(data:any){
    const userData = {
      token: data.token,
      email: data.email,
      id: data.id
    };

    if(this.rememberUser){
      localStorage.setItem('vfRememberedUserData', JSON.stringify(userData));
    }
    
    sessionStorage.setItem('vfUserData', JSON.stringify(userData));
    this.router.navigate(['/main']);
  }

  handleFailedLogin(responseData:any){
    if(responseData["non_field_errors"] && responseData["non_field_errors"].includes("Account not activated.")){
      this.showToastMessage = true;
      setTimeout(() => {
        this.showToastMessage = false
      }, 5000);
    } else {
      this.loginFailed = true;
      setTimeout(()=> {
        this.loginFailed = false;
      }, 3000);
    }

  }


}
