import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-pw',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastComponent, CommonModule, FormsModule],
  templateUrl: './reset-pw.component.html',
  styleUrl: './reset-pw.component.scss'
})
export class ResetPwComponent {
  showToastMessage = false;
  toastMessage = 'Your password has been successfully reset.';

  showPassword1 = false;
  showPassword2 = false;
  pwsDontMatch = false;
  pwsTooShort = false;

  resetData = {
    email : '',
    password : '',
    repeated_password : ''
  }

  uidb64 = this.route.snapshot.paramMap.get('uidb64');;
  token = this.route.snapshot.paramMap.get('token');
  resetPwUrl = ''

  constructor(private authService: AuthService, private route: ActivatedRoute){}


  ngOnInit(){
    
    if(this.uidb64 && this.token){
      console.log(this.uidb64);
      console.log(this.token);
      this.resetPwUrl = `http://localhost:8000/api/pw-reset-confirm/${this.uidb64}/${this.token}/`;
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
      this.resetPassword();
      ngForm.resetForm({ email: '', password: '', repeated_pw: ''});
      setTimeout(() => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.blur());
      }, 10);
    }
  }

  async resetPassword(){
    try {
      const response = await fetch(this.resetPwUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.resetData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
  
      console.log("Password reset successful:", data.message);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  }



  checkPasswords(){
    this.pwsDontMatch = false;
    this.pwsTooShort = false;

    if(this.resetData.password !== this.resetData.repeated_password){
      this.pwsDontMatch = true;
    }

    if(this.resetData.password.length < 6){
      this.pwsTooShort = true;
    }
  }
}
