import { Component } from '@angular/core';
import { PojazdDTO } from '../../dto/PojazdDTO';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PojazdService } from '../../services/pojazd/pojazd.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edytuj-pojazd',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './edytuj-pojazd.component.html',
  styleUrl: './edytuj-pojazd.component.css'
})
export class EdytujPojazdComponent {
  id!: any;
  zmiany!: PojazdDTO;

  constructor(private route: ActivatedRoute, private pojazdService: PojazdService, private router: Router) {}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.pojazdService.getPojazdById(this.id).subscribe((res:any) => {
      this.zmiany = res as PojazdDTO;
    }
    );

  }

  edytuj(){
    this.pojazdService.updatePojazd(this.id, this.zmiany).subscribe(
      ()=>{this.router.navigate(['/pojazd/lista']);}
    )

  }
}
