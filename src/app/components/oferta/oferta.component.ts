import { Component } from '@angular/core';
import { Pojazd } from '../../dto/Pojazd';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { NgFor, NgIf } from '@angular/common';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})
export class OfertaComponent {
  pojazdy: Pojazd[] = [];
  photos: string = '';
  pokazModal: boolean = false;
  wybranyPojazd: Pojazd | null = null;

  constructor(
    private pojazdService: PojazdService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPojazdy();
    this.photos = environment.photos
  }

  loadPojazdy() {
    this.pojazdService.getPojazdy().subscribe((data: Pojazd[]) => {
      this.pojazdy = data.filter(pojazd => pojazd.dostepny);
    });
  }

  wypozyczPojazd() {
    if (this.wybranyPojazd) {
      this.router.navigate(['/wypozyczenie', this.wybranyPojazd.id]);
    }
  }
  pokazSzczegoly(pojazd: Pojazd) {
    this.wybranyPojazd = pojazd;
    this.pokazModal = true;
  }

  zamknijModal() {
    this.wybranyPojazd = null;
    this.pokazModal = false;
  }
}
