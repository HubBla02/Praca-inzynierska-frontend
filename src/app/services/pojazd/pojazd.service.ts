import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PojazdDTO } from '../../dto/PojazdDTO';

@Injectable({
  providedIn: 'root'
})
export class PojazdService {
  private apiUrl = environment.apiUrl;
  private pojazdChanged = new Subject<void>();

  constructor(private http: HttpClient) { }

  getPojazdy(): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/pojazd/lista`, { headers });
  }

  getPojazdById(id: number): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/pojazd/${id}`, { headers });
  }

  createPojazd(nowyPojazd: PojazdDTO): Observable<PojazdDTO> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<PojazdDTO>(`${this.apiUrl}/pojazd`, nowyPojazd, { headers });
  }

  uploadZdjecie(id: number, file: File): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const formData = new FormData();
    formData.append('plik', file, file.name);
    return this.http.post(`${this.apiUrl}/pojazd/${id}/upload-zdjecie`, formData, { headers });
  }

  usunZdjecie(id: number): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/pojazd/${id}/usun-zdjecie`, { headers })
  }

  updatePojazd(id: number, data: PojazdDTO): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.patch(`${this.apiUrl}/pojazd/${id}`, data, { headers });
  }

  deletePojazd(id: number): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/pojazd/${id}`, { headers });
  }
  

  emitPojazdChanged(){
    this.pojazdChanged.next();
  }

}
