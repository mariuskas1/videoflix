import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() usecase:string = '';

  constructor(private router: Router, private location: Location){}


  logOut(){
    sessionStorage.removeItem('vfUserData');
    localStorage.removeItem('vfRememberedUserData');
    this.router.navigate(['/'])
  }

  redirect(){
    this.location.back();
  }
}
