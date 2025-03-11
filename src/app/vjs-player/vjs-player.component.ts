import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import videojs from 'video.js';
import 'videojs-http-source-selector';



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
          label: string
      }[],
  };

  player: any;


  constructor(private elementRef: ElementRef, private router: Router){}



  ngOnInit(){
    this.instantiateVideoPlayer();
  }

  instantiateVideoPlayer() {
    if (!this.options) {
      console.error('Video.js options are not defined');
      return;
    }

    this.player = videojs(this.target.nativeElement, this.options, () => {
      console.log('Player is ready');

      // Set video sources
      this.player.src(this.options!.sources);

      // Ensure httpSourceSelector plugin is available
      if (typeof this.player.httpSourceSelector === 'function') {
        this.player.httpSourceSelector();
      } else {
        console.warn('httpSourceSelector plugin not loaded properly');
      }
    });

    this.addTitleToControlBar();
    this.addHeaderToPlayer();
  }

  // instantiateVideoPlayer(){
  //   this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
  //   });
  //   this.addTitleToControlBar();
  //   this.addHeaderToPlayer();
  // }

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
    const playerElement = this.player.el(); 
    if (!playerElement) return;

    const headerElement = document.createElement('div');
    headerElement.className = 'vjs-video-header';
    headerElement.innerHTML = `
      <img src="./../../assets/img/arrow_back.png" class="arrow-back" (click)="returnToMainPage()">
      <img src="./../../assets/img/logo_small.png">
    `;

    playerElement.appendChild(headerElement);
    const arrowBackElement = headerElement.querySelector('.arrow-back');
    if (arrowBackElement) {
      arrowBackElement.addEventListener('click', () => this.returnToMainPage());
    }

    this.setupHeaderVisibility(headerElement);
  }


  setupHeaderVisibility(headerElement: HTMLElement) {
    if (!this.player) return;

    let timeout: any;

    const showHeader = () => {
        headerElement.classList.add('visible');
        clearTimeout(timeout);
        timeout = setTimeout(() => headerElement.classList.remove('visible'), 2000); 
    };

    this.player.on('mousemove', showHeader);
    this.player.on('touchstart', showHeader);
  }

  
  returnToMainPage(){
    this.router.navigate(['/main']);
  }
  


  ngOnDestroy(){
    if(this.player){
      this.player.dispose();
    }
  }

}
