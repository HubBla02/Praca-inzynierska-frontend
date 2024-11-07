import { Component } from '@angular/core';
import { Wypozyczenie } from '../../dto/Wypozyczenie';
import { WypozyczenieService } from '../../services/wypozyczenie/wypozyczenie.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router } from '@angular/router';


interface Filtr {
  value: number | undefined;
  viewValue: string;
}

@Component({
  selector: 'app-lista-wypozyczen',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule, 
    MatTooltipModule],
  templateUrl: './lista-wypozyczen.component.html',
  styleUrl: './lista-wypozyczen.component.css'
})
export class ListaWypozyczenComponent {
  wypozyczenia: Wypozyczenie[] = [];

  wybranyFiltr: number = 0
  wybranyMiesiac: number | undefined = undefined

  kontrolka = new FormControl();
  wybranyRok: number | undefined = undefined

  filtryZakonczenia: Filtr[] = [
    {value: 0, viewValue: 'Wszystkie'},
    {value: 1, viewValue: 'Trwające'},
    {value: 2, viewValue: 'Zakończone'},
  ];

  miesiace: Filtr[] = [
    {value: undefined, viewValue: 'Wszystkie'},
    {value: 1, viewValue: 'Styczeń'},
    {value: 2, viewValue: 'Luty'},
    {value: 3, viewValue: 'Marzec'},
    {value: 4, viewValue: 'Kwiecień'},
    {value: 5, viewValue: 'Maj'},
    {value: 6, viewValue: 'Czerwiec'},
    {value: 7, viewValue: 'Lipiec'},
    {value: 8, viewValue: 'Sierpień'},
    {value: 9, viewValue: 'Wrzesień'},
    {value: 10, viewValue: 'Październik'},
    {value: 11, viewValue: 'Listopad'},
    {value: 12, viewValue: 'Grudzień'},
  ];


  showDeleteModal: boolean = false; 
  showEndModal: boolean = false;
  usuwaneWypozyczenie: number | null = null;
  wypozyczenieDoZakonczenia: number | null = null;

  constructor(private wypozczenieService: WypozyczenieService, private router: Router) {}

  ngOnInit() {
    this.loadWypozyczenia();
    this.kontrolka.valueChanges.subscribe(value => {
      this.wybranyRok = value ? Number(value) : undefined; 
      this.loadWypozyczenia();
    });
  }

  loadWypozyczenia() {
    this.wypozczenieService.getWypozyczenia(this.wybranyFiltr, this.wybranyMiesiac, this.wybranyRok).subscribe(
      (data: Wypozyczenie[]) => {
        this.wypozyczenia = data;
        this.sort();
      },
      (error: any) => {
        console.error('Error loading users', error);
      }
    );
  }

  zmianaFiltra() {
    this.loadWypozyczenia();
  }

  sort(){
    this.wypozyczenia.sort((a, b) => a.id - b.id);
  }

  doRaportu() {
    this.router.navigate(['/wypozyczenie/lista/raport'], {
      state: { wypozyczenia: this.wypozyczenia },
      queryParams: { 
        miesiac: this.wybranyMiesiac, 
        rok: this.wybranyRok 
      }
    });
  }

  usunWypozyczenie(id: number): void {
    this.wypozczenieService.deleteWypozyczenie(id).subscribe(
      () => {
        this.loadWypozyczenia();
        this.wypozczenieService.emitWypozyczenieChanged();
      },
      (error) => {
        console.error('Error', error);
      }
    )
  }

  zakonczWypozyczenie(id: number): void {
    this.wypozczenieService.zakonczWypozyczenie(id).subscribe(
      () => {
        this.loadWypozyczenia();
        this.wypozczenieService.emitWypozyczenieChanged();
      },
      (error) => {
        console.error('Error', error);
      }
    )
  }

  openEndModal(id: number) {
    this.wypozyczenieDoZakonczenia = id;
    this.showEndModal = true;
  }

  closeEndModal() {
    if (this.wypozyczenieDoZakonczenia !== null){
      this.wypozyczenieDoZakonczenia = null;
    }
    this.showEndModal = false; 
  }

  openDeleteModal(id: number) {
    this.usuwaneWypozyczenie = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    if (this.usuwaneWypozyczenie !== null){
      this.usuwaneWypozyczenie = null;
    }
    this.showDeleteModal = false; 
  }

  confirmDelete(){
    this.showDeleteModal = false; 
    this.usunWypozyczenie(this.usuwaneWypozyczenie!);
  }

  confirmEnd(){
    this.showEndModal = false; 
    this.zakonczWypozyczenie(this.wypozyczenieDoZakonczenia!);
  }

}

