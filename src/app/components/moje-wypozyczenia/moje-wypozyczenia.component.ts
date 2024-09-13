import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Wypozyczenie } from '../../dto/Wypozyczenie';
import { WypozyczenieService } from '../../services/wypozyczenie/wypozyczenie.service';

@Component({
  selector: 'app-moje-wypozyczenia',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './moje-wypozyczenia.component.html',
  styleUrl: './moje-wypozyczenia.component.css'
})
export class MojeWypozyczeniaComponent {
  wypozyczenia: Wypozyczenie[] = [];

  constructor(private wypozyczenieService: WypozyczenieService) {}

  ngOnInit(): void {
    this.wypozyczenieService.getMojeWypozyczenia().subscribe({
      next: (data) => {
        this.wypozyczenia = data;
      },
      error: (err) => {
        console.error('Błąd podczas ładowania wypożyczeń:', err);
      }
    });
  }

}
