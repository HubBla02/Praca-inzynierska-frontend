import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { PojazdDTO } from '../../dto/PojazdDTO';

@Component({
  selector: 'app-dodaj-pojazd',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dodaj-pojazd.component.html',
  styleUrl: './dodaj-pojazd.component.css'
})
export class DodajPojazdComponent {
  nowyPojazd: PojazdDTO = {
    typ: '',
    marka: '',
    model: '',
    rodzajSkrzyni: '',
    rodzajPaliwa: '',
    rokProdukcji: 2024,
    dostepny: true,
    cenaK: 0,
    cenaD: 0,
    zdjecie: new File([], "")
  };

  bledy: any = [];

  constructor(private pojazdService: PojazdService) {}

  dodaj(){
    this.pojazdService.createPojazd(this.nowyPojazd).subscribe(
      () => {
        this.pojazdService.emitPojazdChanged();
      },
      (error) => {
        console.log(error, "errors")
        this.bledy = error.error.errors;
      }
    );
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.nowyPojazd.zdjecie = input.files[0];
    }
  }
}

