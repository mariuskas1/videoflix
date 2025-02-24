import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { Video } from '../models/video.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  videosURL = 'http://127.0.0.1:8000/api/videos/';
  videos: Video[] = [];


  ngOnInit(){
    this.loadVideos();
  }


  loadVideos(){

  }

}
