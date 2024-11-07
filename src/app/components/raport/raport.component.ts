import { Component } from '@angular/core';
import { Wypozyczenie } from '../../dto/Wypozyczenie';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-raport',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor],
  templateUrl: './raport.component.html',
  styleUrl: './raport.component.css'
})
export class RaportComponent {
  wypozyczenia: Wypozyczenie[] = [];

  wybranyMiesiac: number | undefined;
  wybranyRok: number | undefined;

  przychod: number = 0;
  nazwa: string = "";

  miesiace: string[] = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];
  
  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { wypozyczenia: Wypozyczenie[] };
    this.wypozyczenia = state?.wypozyczenia || [];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.wybranyMiesiac = params['miesiac'];
      this.wybranyRok = params['rok'];
    });
    this.oblicz();
  }

  getNazwaMiesiaca(): string | undefined {
    if (this.wybranyMiesiac !== undefined) {
      return this.miesiace[this.wybranyMiesiac - 1];
    }
    return undefined;
  }

  oblicz(){
    this.przychod = this.wypozyczenia.reduce((sum, wypozyczenie) => sum + wypozyczenie.cena, 0);
  }

  PDF() {
    const DATA = document.getElementById('raport');
    if (this.getNazwaMiesiaca() !== undefined && this.wybranyRok !== undefined){
      this.nazwa = "Raport-" + this.getNazwaMiesiaca() + "-" +this.wybranyRok + ".pdf";
    }
    else {
      this.nazwa = "Raport-termin-nieokreślony.pdf"
    }
    
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgWidth = 210; 
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
  
        pdf.save(this.nazwa); 
      });
    }
  }
}
