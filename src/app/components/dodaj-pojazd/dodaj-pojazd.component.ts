import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { PojazdDTO } from '../../dto/PojazdDTO';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dodaj-pojazd',
  standalone: true,
  imports: [FormsModule, RouterModule],
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
    cenaD: 0
  };

  zdjecie: File | null = null;

  constructor(private pojazdService: PojazdService, private router: Router) {}

  dodaj(){
    this.pojazdService.createPojazd(this.nowyPojazd).subscribe(
      (res: any) => {
        console.log("Dodano pojazd");
        this.router.navigate(['/pojazd/lista']);
      },
      (error) => {
        console.log(error, "errors")
      }
    );
  }


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.zdjecie = input.files[0];
    }
  }
}

