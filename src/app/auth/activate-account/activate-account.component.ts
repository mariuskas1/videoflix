import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  message = 'Activating your account...';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const uidb64 = this.route.snapshot.paramMap.get('uidb64');
    const token = this.route.snapshot.paramMap.get('token');

    if (uidb64 && token) {
      this.authService.activateAccount(uidb64, token).subscribe({
        next: () => {
          this.message = 'Account activated successfully! Redirecting...';
          setTimeout(() => this.router.navigate(['/login']), 3000); 
        },
        error: () => {
          this.error = 'Invalid or expired activation link.';
          this.message = '';
        },
      });
    } else {
      this.error = 'Invalid activation link.';
      this.message = '';
    }
  }

}
