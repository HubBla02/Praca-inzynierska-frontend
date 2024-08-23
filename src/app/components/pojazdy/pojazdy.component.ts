import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Pojazd } from '../../dto/Pojazd';
import { PojazdDTO } from '../../dto/PojazdDTO';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pojazdy',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, RouterModule],
  templateUrl: './pojazdy.component.html',
  styleUrl: './pojazdy.component.css'
})
export class PojazdyComponent {
  pojazdy: Pojazd[] = [];
  dodawanie: boolean = false;

  constructor(private pojazdService: PojazdService) {}

  ngOnInit() {
    this.loadPojazdy();
  }

  loadPojazdy() {
    this.pojazdService.getPojazdy().subscribe(
      (data: Pojazd[]) => {
        this.pojazdy = data;
      },
      (error: any) => {
        console.error('Błąd podczas ładowania pojazdow.', error);
      }
    );
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

}
