import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  showPassword1 = false;
  showPassword2 = false;
  pwsDontMatch = false;
  pwsTooShort = false;

  signupSuccessful = false;

  signupURL = 'http://127.0.0.1:8000/api/registration/';

  signupData = {
    email : '',
    password : '',
    repeated_password : ''
  }

  
  constructor(private router: Router) {}


  togglePassword1Visibility(){
    this.showPassword1 = !this.showPassword1;
  }

  togglePassword2Visibility(){
    this.showPassword2 = !this.showPassword2;
  }


  onSubmit(ngForm: NgForm){
    this.checkPasswords();
    if(this.pwsDontMatch || this.pwsTooShort){
      return;
    }

    if(ngForm.valid){
      this.signUp();
    }
  }

  async signUp(){
    try {
      const response = await fetch(this.signupURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.signupData)
      })
      this.checkSignupResponse(response);
    } catch (error) {
      console.error(error);
    }
  }

  async checkSignupResponse(response:any){
    const responseData = await response.json();
    if(response.ok) {
      this.handleSuccessfulSignup();
    } else {
      console.error('Signup failed', responseData)
    }
  }

  handleSuccessfulSignup(){
    this.signupSuccessful = true;
    setTimeout(() => {
      this.signupSuccessful = false;
      this.router.navigate(['/login']);
    }, 2000)
  }


  checkPasswords(){
    this.pwsDontMatch = false;
    this.pwsTooShort = false;

    if(this.signupData.password !== this.signupData.repeated_password){
      this.pwsDontMatch = true;
    }

    if(this.signupData.password.length < 6){
      this.pwsTooShort = true;
    }
  }

}
