import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ZgloszenieDTO } from '../../dto/ZgloszenieDTO';
import { Zgloszenie } from '../../dto/Zgloszenie';
import { Odpowiedz } from '../../dto/OdpowiedzDto';

@Injectable({
  providedIn: 'root'
})
export class ZgloszenieService {
  private apiUrl = environment.apiUrl;
  private zgloszenieChanged = new Subject<void>();

  constructor(private http: HttpClient) { }

  getZgloszenia(): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/zgloszenie/lista`,  { headers });
  }

  getZgloszenieById(id: number): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/zgloszenie/${id}`, { headers })
  }

  usunZgloszenie(id: number): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/zgloszenie/${id}`, { headers });
  }

  getMojeZgloszenia(): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    return this.http.get(`${this.apiUrl}/zgloszenie/moje`, { headers });
  }

  utworzZgloszenie(zgloszenie: ZgloszenieDTO): Observable<any>{
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<ZgloszenieDTO>(`${this.apiUrl}/zgloszenie`, zgloszenie, { headers })
  }

  zmienStatus(id: number, zgloszenie: Zgloszenie): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/zgloszenie/${id}`, zgloszenie, { headers })
  }

  odpowiedz(id: number, odpowiedz: Odpowiedz): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.patch(`${this.apiUrl}/zgloszenie/${id}/odpowiedz`, odpowiedz, { headers })
  }
  
  emitZgloszenieChanged(){
    this.zgloszenieChanged.next();
  }
}
