import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-pw',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './forgot-pw.component.html',
  styleUrl: './forgot-pw.component.scss'
})
export class ForgotPwComponent {
  email = '';


  onSubmit(ngForm: NgForm){
    //reset password
  }

}
