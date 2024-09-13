import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dodaj-zdjecie',
  templateUrl: './dodaj-zdjecie.component.html',
  standalone: true,
  imports: [RouterModule, FormsModule],
  styleUrls: ['./dodaj-zdjecie.component.css']
})
export class DodajZdjecieComponent implements OnInit {
  zdjecie: File | null = null;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private pojazdService: PojazdService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.zdjecie = input.files[0];
    }
  }

  dodajZdjecie() {
    if (this.zdjecie) {
      this.pojazdService.uploadZdjecie(this.id, this.zdjecie).subscribe(
        () => {
          this.router.navigate(['/pojazd/lista']);
        },
        (error) => {
          console.log(error, "errors");
        }
      );
    }
  }
}
