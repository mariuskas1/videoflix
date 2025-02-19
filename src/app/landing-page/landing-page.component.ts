import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  userInput:string = '';

  constructor(private router: Router){}


  checkUserInput(){
    if(this.userInput?.length > 1){
      this.router.navigate(['/signup']);
    }
  }


}
