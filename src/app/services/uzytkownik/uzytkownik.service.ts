import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Uzytkownik } from '../../dto/Uzytkownik';

@Injectable({
  providedIn: 'root'
})
export class UzytkownikService {
  private apiUrl = environment.apiUrl;
  private userChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/uzytkownik/lista`, { headers });
  }

  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/uzytkownik/${id}`, { headers });
  }

  getUserByEmail(email: string): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/uzytkownik/userByEmail/${email}`, { headers });
  }

  updateUser(id: number, data: Uzytkownik): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.patch(`${this.apiUrl}/uzytkownik/${id}`, data, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/uzytkownik/${id}`, { headers });
  }
  

  emitUserChanged(){
    this.userChanged.next();
  }


}