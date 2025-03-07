import { Component, ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { Video } from '../models/video.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { FooterComponent } from "../shared/footer/footer.component";
import { Router } from '@angular/router';



@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  videosURL = 'https://marius-kasparek.developerakademie.org/videoflix_server/api/videos/';
  videos: Video[] = [];
  newVideos: Video[] = [];
  sortedVideos: { [key: string]: Video[] } = {};
  private unsubscribe$ = new Subject<void>();

  activeRow: HTMLElement | null = null;
  isMouseDown = false
  isDragging = false;
  dragThreshold = 10;
  dragTimeout: any = null;
  startX!: number;
  scrollLeft!: number;

  constructor(private http: HttpClient, private router: Router){}


  ngOnInit(){
    this.initVideoSubscription();
  }


  initVideoSubscription(){
    this.videosObservable().pipe(takeUntil(this.unsubscribe$)).subscribe({
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
   
  }


  videosObservable(): Observable<Video[]>{
    return this.http.get<Video[]>(this.videosURL);
  }


  getVideoGenres(){
    return Object.keys(this.sortedVideos);
  }

  
  playVideo(id: number, event: MouseEvent) {
    if (this.isDragging) {
      event.stopImmediatePropagation(); 
      return;
    }
    this.router.navigate(['/play', id]); 
  }

  startDrag(event: MouseEvent, row: EventTarget | null) {
    if(!(row instanceof HTMLElement)) return;

    this.isMouseDown = true;  
    this.isDragging = false;  
    this.startX = event.pageX;
    this.scrollLeft = row.scrollLeft;
    this.activeRow = row;
  }

  drag(event: MouseEvent) {
    if (!this.isMouseDown || !this.activeRow) return; 

    const distanceMoved = Math.abs(event.pageX - this.startX);
    
    if (distanceMoved > this.dragThreshold) {
      this.isDragging = true;
    }

    if (this.isDragging) {
      event.preventDefault();
      this.activeRow.scrollLeft = this.scrollLeft - (event.pageX - this.startX);
    }
  }


  endDrag() {
    this.isMouseDown = false; 
    this.isDragging = false;
  }

  onMouseUpForImage(event: MouseEvent) {
    if (this.isDragging) {
      this.isMouseDown = false;
      event.stopImmediatePropagation(); 
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();  
    this.unsubscribe$.complete(); 

  }


}
