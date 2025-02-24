import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { Video } from '../models/video.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';



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
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient){}


  ngOnInit(){
    this.initVideoSubscription();
  }


  initVideoSubscription(){
    this.getVideos().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data) => {
        this.videos = data;
        console.log(this.videos);
      },
      error: (error) => {
        console.error('Error fetching videos:', error);
      }
    });
  }


  getVideos(): Observable<Video[]>{
    return this.http.get<Video[]>(this.videosURL);
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();  
    this.unsubscribe$.complete(); 
  }


}
