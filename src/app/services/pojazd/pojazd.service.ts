import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pojazd } from '../../dto/Pojazd';
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
