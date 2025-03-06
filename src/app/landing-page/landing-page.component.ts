import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ToastComponent } from '../shared/toast/toast.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, ToastComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  userInput:string = '';
  mailEndpointUrl = 'http://localhost:8000/api/check-email/';
  showToastMessage = false;
  toastMessage = '';

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
    if(!this.isValidEmail(this.userInput)){
      this.handleInvalidUserInput();
    } else {
      this.searchForExistingAccount();
    }    
  }

  handleInvalidUserInput(){
    this.toastMessage = 'Please enter a valid email address.';
    this.showToastMessage = true;
      setTimeout(() => {
        this.showToastMessage = false;
      }, 3000);
  }


  async searchForExistingAccount(){
    try {
      const response = await fetch(this.mailEndpointUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: this.userInput}),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      this.checkMailInputResponse(data);
    } catch (error) {
      console.error(error);
    }
  }

  checkMailInputResponse(data: any){
    if(data.exists){
      this.handleExistingAccount();
    } else{
      this.handleNonExistingAccount();
    }
  }

  handleExistingAccount(){
    this.toastMessage = 'An account with this email address already exists.'
    this.showToastMessage = true;
    setTimeout(() => {
      this.showToastMessage = false;
      this.router.navigate(['/login']);
    }, 3000)
  }


  handleNonExistingAccount(){
    sessionStorage.setItem('vf_signup_mail', this.userInput);
    this.router.navigate(['/signup']);
  }


  isValidEmail(email:string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  }

}
