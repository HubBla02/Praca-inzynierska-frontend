import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private zalogowanyUzytkownik?: string;
  private czyZautentykowanySubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private router = inject(Router);
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.loadUserRole();
  }

  login(uzytkownik: { email: string; haslo: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/konto/login`, uzytkownik, { responseType: 'text' })  // Oczekujemy tekstu (JWT token)
      .pipe(
        tap((token: string) => {
          if (token) {
            this.zalogujUzytkownika(uzytkownik.email, token);
          }
        })
      );
  }

  private zalogujUzytkownika(email: string, token: any) {
    this.zalogowanyUzytkownik = email;
    this.storeJwtToken(token);
    this.czyZautentykowanySubject.next(true);
    this.loadUserRole();
  }

  private storeJwtToken(jwt: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.JWT_TOKEN, jwt);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.JWT_TOKEN);
    }
    this.czyZautentykowanySubject.next(false);
    this.userRoleSubject.next(null);
    this.router.navigate(['/strona-glowna']);
  }

  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem(this.JWT_TOKEN);
  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  getUserEmail(): string | null {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || null;
        return email; 
      } catch (error) {
        console.error('Błąd dekodowania tokena JWT:', error);
        return null;
      }
    }
    return null;
  }

  private loadUserRole() {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getJwtToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
        this.userRoleSubject.next(role);
      } else {
        this.userRoleSubject.next(null);
      }
    }
  }
  getJwtToken() {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(this.JWT_TOKEN) : null;
  }
}
