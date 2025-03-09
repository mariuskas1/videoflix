import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-pw',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastComponent, CommonModule, FormsModule],
  templateUrl: './reset-pw.component.html',
  styleUrl: './reset-pw.component.scss'
})
export class ResetPwComponent {
  showToastMessage = false;
  toastMessage = '';

  showPassword1 = false;
  showPassword2 = false;
  pwsDontMatch = false;
  pwsTooShort = false;

  resetData = {
    email : '',
    password : '',
    repeated_password : ''
  }

  uidb64 = this.route.snapshot.paramMap.get('uidb64');
  token = this.route.snapshot.paramMap.get('token');
  resetPwUrl = ''

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router){}


  ngOnInit(){
    
    if(this.uidb64 && this.token){
      this.resetPwUrl = `https://marius-kasparek.developerakademie.org/videoflix_server/api/pw-reset-confirm/${this.uidb64}/${this.token}/`;
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
  
      this.handleSuccessfulPwReset();
    } catch (error) {
      this.handleFailedPwReset(error);
    }
  }


  handleSuccessfulPwReset(){
    this.toastMessage = 'Your password has been successfully reset. You can now log in using your new password.'
    this.showToastMessage = true;
    setTimeout(() => {
      this.showToastMessage = false;
      this.router.navigate(['/login']);
    }, 3000)
  }

  handleFailedPwReset(error: any){
    if (error instanceof Error) {
      this.toastMessage = error.message;
    } else {
      this.toastMessage = "An unexpected error occurred. Please try again.";
    }

    this.showToastMessage = true;
    setTimeout(() => {
      this.showToastMessage = false;
    }, 3000)
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
