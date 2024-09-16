import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { Pojazd } from '../../dto/Pojazd';
import { WypozyczenieDTO } from '../../dto/WypozyczenieDTO';
import { environment } from '../../environment/environment';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/logowanie/auth.service';
import { WypozyczenieService } from '../../services/wypozyczenie/wypozyczenie.service';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { UzytkownicyComponent } from '../uzytkownicy/uzytkownicy.component';
import { UzytkownikService } from '../../services/uzytkownik/uzytkownik.service';
import { Uzytkownik } from '../../dto/Uzytkownik';

@Component({
  selector: 'app-wypozyczenie',
  standalone: true,
  imports: [NgFor, NgIf, 
    MatRadioModule, MatDatepickerModule, MatFormFieldModule, 
    MatNativeDateModule, MatInputModule, ReactiveFormsModule, 
    MatButtonModule, FormsModule, NgxMatTimepickerModule], 
  templateUrl: './wypozyczenie.component.html',
  styleUrl: './wypozyczenie.component.css'
})


export class WypozyczenieComponent implements OnInit {
  user: Uzytkownik | null = null;
  email: string = '';
  pokazModal: boolean = false;
  wybranyPojazd!: Pojazd;
  id: number = 0;
  photos: string = '';
  kaucjaK: number = 0;
  kaucjaD: number = 0;
  pokazCene: boolean = false;
  wypozyczenie: WypozyczenieDTO | null = null
  najemTyp: string = 'krotkoterminowy'; 
  wybranaData: Date | null = null; 
  godzinaRozpoczecia: string = ''; 
  godzinaZakonczenia: string = ''; 
  dataRozpoczecia: Date | null = null; 
  dataZakonczenia: Date | null = null; 
  dlugoscDlugoterminowego: number = 0;
  dlugoscKrotkoterminowego: number = 0;
  cena: number = 0;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private route: ActivatedRoute,
    private pojazdService: PojazdService,
    private router: Router,
    private userService: UzytkownikService,
    private authService: AuthService,
    private wypozyczenieService: WypozyczenieService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.pojazdService.getPojazdById(id).subscribe(pojazd => {
          this.id = pojazd.id;
          this.wybranyPojazd = pojazd;
          this.kaucjaK = 2 * this.wybranyPojazd.cenaK;
          this.kaucjaD = 2 * this.wybranyPojazd.cenaD;
        });
      }
    });
    this.photos = environment.photos
    this.email = this.authService.getUserEmail()!;
    this.getUser(this.email);
  }

  getUser(email: string){
    this.userService.getUserByEmail(email).subscribe({
      next: (data) => {
        this.user = data;
        this.trzezwosc();
      },
      error: (err) => {
        console.error('Błąd podczas ładowania usera:', err);
      }
    });
  }

  trzezwosc(){
    if (!this.user!.czyTrzezwy){
      this.pokazModal = true;
    }
  }

  sprawdzTeraz(){
    this.pokazModal = false;
    this.router.navigate(["/alkomat"]);
  }

  zamknijModal(){
    this.pokazModal = false;
    this.router.navigate(["/przegladaj"]);
  }

  onNajemTypChange() {
    this.pokazCene = false;
    if (this.najemTyp === 'krotkoterminowy') {
      this.godzinaRozpoczecia = '';
      this.godzinaZakonczenia = '';
    } else if (this.najemTyp === 'dlugoterminowy') {
      this.dataRozpoczecia = null;
      this.dataZakonczenia = null;
    }
  }

  obliczCene(){
    this.pokazCene = true;
    if (this.najemTyp === 'dlugoterminowy'){
      const timeDiff = this.range.value.end!.getTime() - this.range.value.start!.getTime();
      this.dlugoscDlugoterminowego = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.cena = this.dlugoscDlugoterminowego * this.wybranyPojazd.cenaD + this.kaucjaD;
    }
    if (this.najemTyp === 'krotkoterminowy'){
      const godzinaRozpoczeciaNum = this.convertTimeStringToNumber(this.godzinaRozpoczecia);
      const godzinaZakonczeniaNum = this.convertTimeStringToNumber(this.godzinaZakonczenia);
      const roznicaWMinutach = (godzinaZakonczeniaNum - godzinaRozpoczeciaNum);
      if (this.wybranaData) {
        this.dataRozpoczecia = new Date(this.wybranaData);
        this.dataRozpoczecia.setHours(Math.floor(godzinaRozpoczeciaNum / 60), godzinaRozpoczeciaNum % 60);
  
        this.dataZakonczenia = new Date(this.wybranaData);
        this.dataZakonczenia.setHours(Math.floor(godzinaZakonczeniaNum / 60), godzinaZakonczeniaNum % 60);
        this.dlugoscKrotkoterminowego = Math.floor(roznicaWMinutach / 60);
        if (roznicaWMinutach % 60 !== 0){
          this.dlugoscKrotkoterminowego += 1
        }
        this.cena = this.dlugoscKrotkoterminowego * this.wybranyPojazd.cenaK + this.kaucjaK;
      }
    }
  }

  cofnij(){
    this.router.navigate(["/przegladaj"]);
  }

  wypozycz(){
    this.trzezwosc();
    if (this.najemTyp === "dlugoterminowy"){
      this.obliczCene();
      this.wypozyczenie = {
        pojazdId: this.id,
        cena: this.cena,
        dataRozpoczecia: this.range.value.start!,
        dataZakonczenia: this.range.value.end!,
        uzytkownikEmail: this.authService.getUserEmail()!
        };
      }

    if (this.najemTyp === "krotkoterminowy"){
      this.obliczCene();
      this.wypozyczenie = {
        pojazdId: this.id,
        cena: this.cena,
        dataRozpoczecia: this.dataRozpoczecia!,
        dataZakonczenia: this.dataZakonczenia!,
        uzytkownikEmail: this.authService.getUserEmail()!
      };
    }


      this.wypozyczenieService.utworzWypozyczenie(this.wypozyczenie!).subscribe(
        (res: any) => {
          this.router.navigate(["/moje"]);
        },
        (error) => {
          console.log(error, "errors")
        }
      );
    }

    convertTimeStringToNumber(time: string): number {
      const [hour, minute] = time.split(':').map(Number); 
      return hour * 60 + minute;
    }

}
