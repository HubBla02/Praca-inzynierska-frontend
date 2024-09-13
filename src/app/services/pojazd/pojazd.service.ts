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
    return this.http.get(`${this.apiUrl}/pojazd/lista`);
  }

  getPojazdById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pojazd/${id}`);
  }

  createPojazd(nowyPojazd: PojazdDTO): Observable<PojazdDTO> {
    return this.http.post<PojazdDTO>(`${this.apiUrl}/pojazd`, nowyPojazd);
  }

  uploadZdjecie(id: number, file: File): Observable<any> {
    console.log(file)
    const formData = new FormData();
    formData.append('plik', file, file.name);
    return this.http.post(`${this.apiUrl}/pojazd/${id}/upload-zdjecie`, formData);
  }

  usunZdjecie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pojazd/${id}/usun-zdjecie`)
  }

  updatePojazd(id: number, data: PojazdDTO): Observable<any> {
    return this.http.patch(`${this.apiUrl}/pojazd/${id}`, data);
  }

  deletePojazd(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pojazd/${id}`);
  }
  

  emitPojazdChanged(){
    this.pojazdChanged.next();
  }

}
