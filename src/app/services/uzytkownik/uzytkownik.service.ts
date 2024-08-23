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
    return this.http.get(`${this.apiUrl}/uzytkownik/lista`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/uzytkownik/${id}`);
  }

  updateUser(id: number, data: Uzytkownik): Observable<any> {
    return this.http.patch(`${this.apiUrl}/uzytkownik/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/uzytkownik/${id}`);
  }
  

  emitUserChanged(){
    this.userChanged.next();
  }


}
