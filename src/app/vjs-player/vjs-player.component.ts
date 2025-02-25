import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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


  constructor(private elementRef: ElementRef){}



  ngOnInit(){
    this.instantiateVideoPlayer();
  }


  instantiateVideoPlayer(){
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    this.addTitleToControlBar();
  }

  addTitleToControlBar() {
    if (!this.player) return;

    const controlBar = this.player.getChild('controlBar'); 

    if (controlBar) {
        const titleElement = document.createElement('div');
        titleElement.className = 'vjs-video-title';
        titleElement.innerText = this.videoTitle; 

        controlBar.el().insertBefore(titleElement, controlBar.el().firstChild);
    }
}


  ngOnDestroy(){
    if(this.player){
      this.player.dispose();
    }
  }

}
