import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, ToastComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  showPassword1 = false;
  showPassword2 = false;
  pwsDontMatch = false;
  pwsTooShort = false;

  signupSuccessful = false;
  showToastMessage = false;
  toastMessage = 'Sign-up successful! A mail with an activation link has been sent. Please check your inbox to activate your account.'

  signupURL = 'https://marius-kasparek.developerakademie.org/videoflix_server/api/registration/';

  signupData = {
    email : '',
    password : '',
    repeated_password : ''
  }

  
  constructor(private router: Router) {}

  ngOnInit(){
    this.checkForMailInput();
  }

  checkForMailInput(){
    const savedMail = sessionStorage.getItem('vf_signup_mail')
    if(savedMail){
      this.signupData.email = savedMail;
    }
  }


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
      ngForm.resetForm({ email: '', password: '', repeated_pw: ''});
      setTimeout(() => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.blur());
      }, 10);
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
    this.showToastMessage = true;
    setTimeout(() => {
      this.signupSuccessful = false;
      this.showToastMessage = false;
      this.router.navigate(['/login']);
    }, 5000)
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
