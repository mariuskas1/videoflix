import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenValidationUrl = 'http://127.0.0.1:8000/api/token/validate/'

  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    if (!token) return of(false);

    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    
    return this.http.get<{ valid: boolean }>(this.tokenValidationUrl, { headers })
      .pipe(
        map(() => true), 
        catchError(() => of(false)) 
      );
  }

  getToken(): string | null {
    const user = JSON.parse(localStorage.getItem('vfUserData') || '{}');
    return user.token || null;
  }

  activateAccount(uid: string, token: string) {
    return this.http.get(`http://localhost:8000/api/activate/${uid}/${token}/`);
  }
}
