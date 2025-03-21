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
  BASE_URL = 'https://marius-kasparek.developerakademie.org/videoflix_server/api/videos';
  video!: Video;
  videoLoaded = false;

 

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.loadVideo();    
  }

  

  async loadVideo(){
    const videoId = this.route.snapshot.paramMap.get('id');
    if(videoId){
      const videoURL = `${this.BASE_URL}/${videoId}`;
      try {
        const response = await fetch(videoURL);
        if(response.ok){
          this.video = await response.json();
          this.videoLoaded = true;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

}
