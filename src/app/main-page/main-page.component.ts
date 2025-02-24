import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { Video } from '../models/video.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { FooterComponent } from "../shared/footer/footer.component";



@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  videosURL = 'http://127.0.0.1:8000/api/videos/';
  videos: Video[] = [];
  newVideos: Video[] = [];
  sortedVideos: { [key: string]: Video[] } = {};
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient){}


  ngOnInit(){
    this.initVideoSubscription();
  }


  initVideoSubscription(){
    this.getVideos().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data) => {
        this.videos = data;
        this.sortVideos();
      },
      error: (error) => {
        console.error('Error fetching videos:', error);
      }
    });
  }


  sortVideos(){
    this.newVideos = this.videos.filter(video => video.new);

    this.videos.forEach((video) => {
      const categoryKey = video.genre.charAt(0).toUpperCase() + video.genre.slice(1);

      if(!this.sortedVideos[categoryKey]){
        this.sortedVideos[categoryKey] = [];
      }

      this.sortedVideos[categoryKey].push(video);
    });

    console.log(this.sortedVideos);
  }


  getVideos(): Observable<Video[]>{
    return this.http.get<Video[]>(this.videosURL);
  }


  getVideoGenres(){
    return Object.keys(this.sortedVideos);
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();  
    this.unsubscribe$.complete(); 
  }


}
