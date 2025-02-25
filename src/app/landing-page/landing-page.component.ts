import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  userInput:string = '';

  constructor(private router: Router){}


  ngOnInit(){
    this.checkLocalStorageForRememberedUser();
  }


  checkLocalStorageForRememberedUser(){
    const rememberedUserData = JSON.parse(localStorage.getItem('vfRememberedUserData') || '{}');
    if(rememberedUserData && rememberedUserData.token){
      localStorage.setItem('vfUserData', JSON.stringify(rememberedUserData));
      this.router.navigate(['/main']);
    }
  }
  

  checkUserInput(){
    if(this.userInput?.length > 1){
      this.router.navigate(['/signup']);
    }
  }


}
