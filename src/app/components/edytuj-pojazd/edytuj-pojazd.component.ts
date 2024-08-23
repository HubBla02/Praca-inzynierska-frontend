import { Component } from '@angular/core';
import { PojazdDTO } from '../../dto/PojazdDTO';
import { ActivatedRoute } from '@angular/router';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edytuj-pojazd',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './edytuj-pojazd.component.html',
  styleUrl: './edytuj-pojazd.component.css'
})
export class EdytujPojazdComponent {
  id!: any;
  zmiany!: PojazdDTO;

  constructor(private route: ActivatedRoute, private pojazdService: PojazdService) {}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.pojazdService.getPojazdById(this.id).subscribe((res:any) => {
      this.zmiany = res as PojazdDTO;
    }
    );

  }

  edytuj(){
    this.pojazdService.updatePojazd(this.id, this.zmiany).subscribe()
  }

  onFileChange(event: Event) {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files.length > 0) {
    //   this.zmiany.zdjecie = input.files[0];
    // }
  }
}
