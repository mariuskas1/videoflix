import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import videojs from 'video.js';



@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [],
  templateUrl: './vjs-player.component.html',
  styleUrl: './vjs-player.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent {
    @ViewChild('target', {static: true}) target!: ElementRef;
    @Input() videoTitle: string = '';
    @Input() options?: {
      fluid: boolean,
      aspectRatio: string,
      autoplay: boolean,
      controls: boolean,
      sources: {
          src: string,
          type: string,
      }[],
  };

  player: any;


  constructor(private elementRef: ElementRef, private router: Router){}



  ngOnInit(){
    this.instantiateVideoPlayer();
  }


  instantiateVideoPlayer(){
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    this.addTitleToControlBar();
    this.addHeaderToPlayer();
  }

  addTitleToControlBar() {
    if (!this.player) return;

    const controlBar = this.player.getChild('controlBar'); 
    const volumePanel = controlBar.getChild('volumePanel');

    if (controlBar) {
        const titleElement = document.createElement('div');
        titleElement.className = 'vjs-video-title';
        titleElement.innerText = this.videoTitle; 
        titleElement.style.flexGrow = '1';

        volumePanel.el().insertAdjacentElement('afterend', titleElement);
    }
  }


  addHeaderToPlayer(){
    if (!this.player) return;

    const playerElement = this.player.el(); // Get Video.js container
    if (!playerElement) return;

    // Create the header element
    const headerElement = document.createElement('div');
    headerElement.className = 'vjs-video-header';
    headerElement.innerHTML = `
      <img src="./../../assets/img/arrow_back.png" class="arrow-back" (click)="returnToMainPage()">
      <img src="./../../assets/img/logo_small.png">
    `;

    // Append header to the player
    playerElement.appendChild(headerElement);
    const arrowBackElement = headerElement.querySelector('.arrow-back');
    if (arrowBackElement) {
      arrowBackElement.addEventListener('click', () => this.returnToMainPage());
    }

    // Handle hiding/showing header based on user activity
    this.setupHeaderVisibility(headerElement);
  }


  setupHeaderVisibility(headerElement: HTMLElement) {
    if (!this.player) return;

    let timeout: any;

    const showHeader = () => {
        headerElement.classList.add('visible');
        clearTimeout(timeout);
        timeout = setTimeout(() => headerElement.classList.remove('visible'), 2000); // Hide after 2s
    };

    // Show header when user interacts
    this.player.on('mousemove', showHeader);
    this.player.on('touchstart', showHeader);
  }

  returnToMainPage(){
    console.log('hel')
    this.router.navigate(['/main']);
  }
  


  ngOnDestroy(){
    if(this.player){
      this.player.dispose();
    }
  }

}
