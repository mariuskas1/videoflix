import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  signupData = {
    email : '',
    password : '',
    repeated_pw : ''
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
      console.log(this.signupData);
      
      setTimeout(()=>{
        ngForm.resetForm();
      }, 200)
    }
  }


  checkPasswords(){
    this.pwsDontMatch = false;
    this.pwsTooShort = false;

    if(this.signupData.password !== this.signupData.repeated_pw){
      this.pwsDontMatch = true;
    }

    if(this.signupData.password.length < 6){
      this.pwsTooShort = true;
    }
  }

}
