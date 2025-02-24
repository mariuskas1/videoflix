import { Component } from '@angular/core';
import { Video } from '../models/video.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  BASE_URL = 'http://127.0.0.1:8000/api/videos';
  video!: Video;

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
          console.log("Fetched video:", this.video);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

}
