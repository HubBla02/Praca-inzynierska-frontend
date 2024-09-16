import { Component, OnInit } from '@angular/core';
import { Uzytkownik } from '../../dto/Uzytkownik';
import { UzytkownikService } from '../../services/uzytkownik/uzytkownik.service';
import { AuthService } from '../../services/logowanie/auth.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alkomat',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './alkomat.component.html',
  styleUrl: './alkomat.component.css'
})
export class AlkomatComponent implements OnInit{
  user: Uzytkownik | null = null;
  userSober: Uzytkownik | null = null;
  userBlock: Uzytkownik | null = null;
  email: string = '';
  alkohol: number = 0;
  plec: string = 'kobieta'; 
  wspolczynnik: number = 0.6;
  masa: number = 0;
  promile: number = 0;
  pokazPromile: boolean = false;
  pokazModal: boolean = false;
  koniecPicia: string = ''; 
  alkohole: { objetosc: number | null; procent: number | null }[] = [{ objetosc: null, procent: null }];

  constructor(private userService: UzytkownikService, private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.email = this.authService.getUserEmail()!;
    this.getUser(this.email);
  }


  getUser(email: string){
    this.userService.getUserByEmail(email).subscribe({
      next: (data) => {
        this.user = data;
        this.blokada();
      },
      error: (err) => {
        console.error('Błąd podczas ładowania usera:', err);
      }
    });
    }
    
    dodajAlkohol() {
      this.alkohole.push({ objetosc: 0, procent: 0 });
    }
  
    obliczAlkohol() {
      this.alkohol = this.alkohole.reduce((sum, alkohol) => {
        return sum + (alkohol.objetosc! * (alkohol.procent! / 100));
      }, 0);
    }
  
    zmienWspolczynnik() {
      this.wspolczynnik = this.plec === 'mezczyzna' ? 0.7 : 0.6;
    }

    obliczCzasOdPicia(): number {
      const teraz = new Date();
      const koniecPiciaData = new Date(this.koniecPicia);
  
      const roznicaMs = teraz.getTime() - koniecPiciaData.getTime(); 
      const roznicaH = roznicaMs / (1000 * 60 * 60); 
  
      return roznicaH;
    }

    zablokuj(email: string): void {
      this.userService.getUserByEmail(email).subscribe(
        (user) => {
          this.userBlock = user;
            this.userBlock!.czyZablokowany = true;
            this.userService.updateUser(this.userBlock!.id, this.userBlock!).subscribe(
              (error) => {
                console.error("Error while completing edition.")
              }
          )}
      )
    }

    trzezwy(email: string): void {
      this.userService.getUserByEmail(email).subscribe(
        (user) => {
          this.userSober = user;
            this.userSober!.czyTrzezwy = true;
            this.userService.updateUser(this.userSober!.id, this.userSober!).subscribe()}
      )
    }

    nietrzezwy(email: string): void {
      this.userService.getUserByEmail(email).subscribe(
        (user) => {
          this.userSober = user;
            this.userSober!.czyTrzezwy = false;
            this.userService.updateUser(this.userSober!.id, this.userSober!).subscribe(
              (error) => {
                console.error("Error while completing edition.")
              }
          )}
      )
    }

    blokada(){
      if (this.user!.czyZablokowany){
        this.pokazModal = true;
      }
    }

    zbadaj() {
      if (this.promile <= 0.2) {
        this.trzezwy(this.email);
        this.snackbar.open('Zweryfikowano! Możesz teraz wypożyczyć pojazd!', 'Super!', {
          duration: 4000
        });
      } else {
        this.nietrzezwy(this.email);
        this.zablokuj(this.email);
        this.pokazModal = true;
      }
    }
    
    zamknijModal(){
      this.pokazModal = false;
      this.router.navigate(["/zgloszenia/moje"]);
    }

  
    onSubmit() {
      this.zmienWspolczynnik();
      this.obliczAlkohol();
      const promileNaKoniecPicia = this.alkohol / (this.wspolczynnik * this.masa);
      const czasOdPicia = this.obliczCzasOdPicia();
      const eliminacjaAlkoholu = czasOdPicia * 0.15;
      this.promile = Math.max(promileNaKoniecPicia - eliminacjaAlkoholu, 0); 
      this.pokazPromile = true;
      this.zbadaj();
    }
  }
