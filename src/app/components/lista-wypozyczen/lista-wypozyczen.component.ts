import { Component } from '@angular/core';
import { Wypozyczenie } from '../../dto/Wypozyczenie';
import { WypozyczenieService } from '../../services/wypozyczenie/wypozyczenie.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-lista-wypozyczen',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './lista-wypozyczen.component.html',
  styleUrl: './lista-wypozyczen.component.css'
})
export class ListaWypozyczenComponent {
  wypozyczenia: Wypozyczenie[] = [];

  showDeleteModal: boolean = false; 
  usuwaneWypozyczenie: number | null = null;

  constructor(private wypozczenieService: WypozyczenieService) {}

  ngOnInit() {
    this.loadWypozyczenia();
  }

  loadWypozyczenia() {
    this.wypozczenieService.getWypozyczenia().subscribe(
      (data: Wypozyczenie[]) => {
        this.wypozyczenia = data;
        this.sort();
      },
      (error: any) => {
        console.error('Error loading users', error);
      }
    );
  }

  sort(){
    this.wypozyczenia.sort((a, b) => a.id - b.id);
  }

  zakonczWypozyczenie(id: number): void {
    this.wypozczenieService.deleteWypozyczenie(id).subscribe(
      () => {
        this.loadWypozyczenia();
        this.wypozczenieService.emitWypozyczenieChanged();
      },
      (error) => {
        console.error('Error while deleting user', error);
      }
    )
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
    this.zakonczWypozyczenie(this.usuwaneWypozyczenie!);
  }

}

