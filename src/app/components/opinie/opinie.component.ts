import { Component, OnInit } from '@angular/core';
import { Opinia } from '../../dto/Opinia';
import { OpiniaService } from '../../services/opinia/opinia.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-opinie',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './opinie.component.html',
  styleUrl: './opinie.component.css'
})
export class OpinieComponent implements OnInit {
  opinie: Opinia[] = [];
  srednia: number | null = null;


  constructor(private opinieService: OpiniaService) {}

  ngOnInit(): void {
    this.opinieService.getOpinie().subscribe((data: Opinia[]) => {
      this.opinie = data;
      this.srednia = this.obliczSredniaOcena();
    });
  }

  obliczSredniaOcena(): number | null {
    if (this.opinie.length === 0) return null;
    const sumaOcen = this.opinie.reduce((sum, opinia) => sum + opinia.ocena, 0);
    return parseFloat((sumaOcen / this.opinie.length).toFixed(2));
  }
}