import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Pojazd } from '../../dto/Pojazd';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-pojazdy',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, RouterModule],
  templateUrl: './pojazdy.component.html',
  styleUrl: './pojazdy.component.css'
})
export class PojazdyComponent {
  pojazdy: Pojazd[] = [];

  public pokazModalZdjecie: boolean = false;
  public aktualnaSciezkaZdjecia: string = '';

  modalUsuwaniaPojazdu: boolean = false; 
  idPojazduDoUsuniecia: number | null = null;

  modalUsuwaniaZdjecia: boolean = false;

  constructor(private pojazdService: PojazdService) {}

  ngOnInit() {
    this.loadPojazdy();
  }

  loadPojazdy() {
    this.pojazdService.getPojazdy().subscribe(
      (data: Pojazd[]) => {
        this.pojazdy = data;
        console.log(this.pojazdy[0]);
      },
      (error: any) => {
        console.error('Błąd podczas ładowania pojazdow.', error);
      }
    );
  }

  podgladZdjecia(sciezkaDoZdjecia: string) {
    this.aktualnaSciezkaZdjecia = `${environment.photos}${sciezkaDoZdjecia}`;
    if (this.aktualnaSciezkaZdjecia){
      this.pokazModalZdjecie = true;
    }
  }

  zamknijModalZdjecia() {
    this.pokazModalZdjecie = false;
  }

  deletePojazd(pojazdId: number): void {
    this.pojazdService.deletePojazd(pojazdId).subscribe(
      () => {
        this.loadPojazdy();
        this.pojazdService.emitPojazdChanged();
      },
      (error) => {
        console.error('Błąd podczas usuwania pojazdu', error);
      }
    );
  }

  deletePhoto(pojazdId: number){
    this.pojazdService.usunZdjecie(pojazdId).subscribe(
      () => {
        this.loadPojazdy();
        this.pojazdService.emitPojazdChanged();
      },
      (error) => {
        console.error('Błąd podczas usuwania zdjecia', error);
      }
    );
  }

  otworzModalUsuwaniaPojazdu(pojazdId: number){
    this.modalUsuwaniaPojazdu = true;
    this.idPojazduDoUsuniecia = pojazdId;
  }

  zamknijModalUsuwaniaPojazdu(){
    if(this.modalUsuwaniaPojazdu !== null){
      this.idPojazduDoUsuniecia = null;
    }
    this.modalUsuwaniaPojazdu = false;
  }

  otworzModalUsuwaniaZdjecia(pojazdId: number){
    this.modalUsuwaniaZdjecia = true;
    this.idPojazduDoUsuniecia = pojazdId;
  }

  zamknijModalUsuwaniaZdjecia(){
    if(this.modalUsuwaniaZdjecia !== null){
      this.idPojazduDoUsuniecia = null;
    }
    this.modalUsuwaniaZdjecia = false;
  }


  usunPojazd(){
    this.modalUsuwaniaPojazdu = false;
    this.deletePojazd(this.idPojazduDoUsuniecia!);
  }

  usunZdjecie(){
    this.modalUsuwaniaZdjecia = false;
    this.deletePhoto(this.idPojazduDoUsuniecia!);
  }

}
