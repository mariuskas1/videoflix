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

      // Set default video source (720p)
      this.player.src(this.options!.sources.find(source => source.label === '720p'));

      this.addResolutionSelector();
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

  addResolutionSelector() {
    const player = this.player;

    if (!player) return;

    const Button = videojs.getComponent('Button');

    class ResolutionSelector extends Button {
      constructor(player: any, options?: any) {
        super(player, options);
        this.addClass('vjs-resolution-button');

        // Create a text element inside the button
        const buttonText = document.createElement('span');
        buttonText.innerText = '720p'; // Default text
        buttonText.classList.add('vjs-resolution-text');

        this.el().appendChild(buttonText);
      }

        handleClick() {
            const currentSrc = player.currentSrc();
            const sources = player.options_.sources;

            // Find the next resolution in the list (looping back to the start)
            let currentIndex = sources.findIndex((src: { src: string; label: string }) => src.src === currentSrc);
            let nextIndex = (currentIndex + 1) % sources.length;

            // Save current playback time
            const currentTime = player.currentTime();
            const wasPlaying = !player.paused(); 

            // Switch to the next resolution
            player.src(sources[nextIndex]);
          
            // ✅ Restore playback position after the new source loads
            player.ready(() => {
              player.currentTime(currentTime);
              if (wasPlaying) {
                  player.play();
              }
            });

            const buttonText = this.el().querySelector('.vjs-resolution-text') as HTMLElement | null;
            if (buttonText) {
                buttonText.innerText = sources[nextIndex].label;
            }
        }
    }

    // Register the button component
    videojs.registerComponent('ResolutionSelector', ResolutionSelector);

    // Add the button to the control bar
    player.getChild('controlBar').addChild('ResolutionSelector', {}, 10);
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
