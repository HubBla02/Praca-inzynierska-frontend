import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Opinia } from '../../dto/Opinia';
import { OpiniaDTO } from '../../dto/OpiniaDTO';

@Injectable({
  providedIn: 'root'
})
export class OpiniaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOpinie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/opinia/lista`);
  }

  utworzOpinie(opinia: OpiniaDTO): Observable<any>{
    const token = localStorage.getItem('JWT_TOKEN');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<Opinia>(`${this.apiUrl}/opinia`, opinia, { headers })
  }
  
}
