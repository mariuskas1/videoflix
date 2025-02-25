import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('vfUserData') || '{}');
    return !!user.token;  
  }
}
