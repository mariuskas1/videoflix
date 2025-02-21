import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword = false;
  loginFailed = false;

  loginURL = 'http://127.0.0.1:8000/api/login/';

  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}


  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  async logIn(){
    try {
      const response = await fetch(this.loginURL, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginData)
      });

      const responseData = await response.json();

      if(response.ok && responseData.token){
        this.handleSuccesfulLogin(responseData);
      } else{
        this.handleFailedLogin();
      }

    } catch (error) {
      console.error(error);
    }
    
  }


  handleSuccesfulLogin(data:any){
    const userData = {
      token: data.token,
      email: data.email,
      id: data.id
    };
    
    localStorage.setItem('vfUserData', JSON.stringify(userData));
    this.router.navigate(['/main']);
  }

  handleFailedLogin(){
    this.loginFailed = true;
    setTimeout(()=> {
      this.loginFailed = false;
    }, 2000);
  }


}
