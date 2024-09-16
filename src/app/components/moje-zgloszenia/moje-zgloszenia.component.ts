import { Component } from '@angular/core';
import { Zgloszenie } from '../../dto/Zgloszenie';
import { ZgloszenieService } from '../../services/zgloszenie/zgloszenie.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moje-zgloszenia',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './moje-zgloszenia.component.html',
  styleUrl: './moje-zgloszenia.component.css'
})
export class MojeZgloszeniaComponent {
  zgloszenia: Zgloszenie[] = [];

  showModal: boolean = false;
  modalContent: string = '';


  constructor(private zgloszenieService: ZgloszenieService, private router: Router) {}

  ngOnInit(): void {
    this.zgloszenieService.getMojeZgloszenia().subscribe({
      next: (data) => {
        this.zgloszenia = data;
      },
      error: (err) => {
        console.error('Błąd podczas ładowania zgłoszeń:', err);
      }
    });
  }

  doTworzenia(){
    this.router.navigate(['/zgloszenia/moje/utworz']);
  }

  openModal(content: string) {
    this.modalContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalContent = '';
  }

}
