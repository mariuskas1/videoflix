import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-pw',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, ToastComponent],
  templateUrl: './forgot-pw.component.html',
  styleUrl: './forgot-pw.component.scss'
})
export class ForgotPwComponent {
  email = '';
  showToastMessage = false;
  toastMessage = 'A mail with further instructions has been sent. Please check your inbox.';

  constructor(private authService: AuthService){}


  onSubmit(ngForm: NgForm){
    this.requestPasswordReset();
    this.showToastMessage = true;
    ngForm.resetForm({ email: ''})

    setTimeout(() => {
      this.showToastMessage = false;
    }, 3000)
  }

  
  requestPasswordReset(){
    this.authService.resetPassword(this.email).subscribe({
      next: () => {
        this.showToastMessage = true;

        setTimeout(() => {
            this.showToastMessage = false;
        }, 3000);
      },
      error: (err) => {
          console.error("Password reset error:", err);
      }
    });
  }

}
