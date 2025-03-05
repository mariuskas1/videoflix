import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [],
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
    // Get UID and Token from the URL
    const uid = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');

    if (uid && token) {
      this.authService.activateAccount(uid, token).subscribe({
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
