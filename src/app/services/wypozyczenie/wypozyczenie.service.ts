import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WypozyczenieDTO } from '../../dto/WypozyczenieDTO';

@Injectable({
  providedIn: 'root'
})
export class WypozyczenieService {

  private apiUrl = environment.apiUrl;
  private wypozyczenieChanged = new Subject<void>();

  constructor(private http: HttpClient) { }

  getWypozyczenia(): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/wypozyczenie/lista`, { headers });
  }

  deleteWypozyczenie(id: number): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/wypozyczenie/${id}`, { headers });
  }

  getMojeWypozyczenia(): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    return this.http.get(`${this.apiUrl}/wypozyczenie/moje`, { headers });
  }

  utworzWypozyczenie(wypozyczenie: WypozyczenieDTO): Observable<any>{
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<WypozyczenieDTO>(`${this.apiUrl}/wypozyczenie`, wypozyczenie, { headers })
  }
  
  emitWypozyczenieChanged(){
    this.wypozyczenieChanged.next();
  }

}
