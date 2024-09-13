import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { RejestracjaDto } from '../../dto/RejestracjaDto';

@Injectable({
  providedIn: 'root'
})
export class KontoService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  zarejestruj(uzytkownik: RejestracjaDto){
    return this.http.post<RejestracjaDto>(`${this.apiUrl}/konto/register`, uzytkownik);
  }
}
