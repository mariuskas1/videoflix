import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Video } from '../models/video.model';
import { ActivatedRoute } from '@angular/router';


import { CommonModule } from '@angular/common';
import { VjsPlayerComponent } from '../vjs-player/vjs-player.component';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, VjsPlayerComponent],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  BASE_URL = 'http://127.0.0.1:8000/api/videos';
  video!: Video;
  videoLoaded = false;

 

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.loadVideo();    
  }

  

  // ngAfterViewInit(): void {
  //   this.player = videojs(this.videoElement.nativeElement, {
  //     controls: true, // Enable video controls
  //     autoplay: true, // Automatically play when loaded
  //     fluid: true, // Responsive video sizing
  //     preload: 'auto' // Preload the video
  //   });

    
  // }

  // ngOnDestroy(): void {
  //   if (this.player) {
  //     this.player.dispose(); // Cleanup the player when component is destroyed
  //   }
  // }


  async loadVideo(){
    const videoId = this.route.snapshot.paramMap.get('id');
    if(videoId){
      const videoURL = `${this.BASE_URL}/${videoId}`;
      try {
        const response = await fetch(videoURL);
        if(response.ok){
          this.video = await response.json();
          this.videoLoaded = true;
          console.log("Fetched video:", this.video);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

}
