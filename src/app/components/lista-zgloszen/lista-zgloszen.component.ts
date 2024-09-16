import { Component } from '@angular/core';
import { Zgloszenie } from '../../dto/Zgloszenie';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ZgloszenieService } from '../../services/zgloszenie/zgloszenie.service';
import { FormsModule } from '@angular/forms';
import { Odpowiedz } from '../../dto/OdpowiedzDto';

@Component({
  selector: 'app-lista-zgloszen',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgStyle],
  templateUrl: './lista-zgloszen.component.html',
  styleUrl: './lista-zgloszen.component.css'
})
export class ListaZgloszenComponent {
  zgloszenia: Zgloszenie[] = [];
  odpowiedzDoWyslania: Odpowiedz = {odpowiedz: ''};

  showDeleteModal: boolean = false; 
  usuwaneZgloszenie: number | null = null;
  statusId: number | null = null;

  showModal: boolean = false;
  modalContent: string = '';

  odpowiedz: string = '';
  showOdpowiedzModal: boolean = false;
  odpowiedzWtrakcie: number | null = null;

  constructor(private zgloszenieService: ZgloszenieService) {}

  ngOnInit() {
    this.loadZgloszenia();
  }

  loadZgloszenia() {
    this.zgloszenieService.getZgloszenia().subscribe(
      (data: Zgloszenie[]) => {
        this.zgloszenia = data;
      },
      (error: any) => {
        console.error('Error loading users', error);
      }
    );
  }

  usunZgloszenie(id: number): void {
    this.zgloszenieService.usunZgloszenie(id).subscribe(
      () => {
        this.loadZgloszenia();
        this.zgloszenieService.emitZgloszenieChanged();
      },
      (error) => {
        console.error('Error while deleting user', error);
      }
    )
  }

  zmienStatus(zgloszenie: Zgloszenie){
    this.zgloszenieService.zmienStatus(zgloszenie.id, zgloszenie).subscribe(
      () => {
        this.loadZgloszenia();
        this.zgloszenieService.emitZgloszenieChanged();
      },
      (error) => {
        console.error("Błąd przy zmianie statusu", error);
      }
    )
  }

  openOdpowiedzModal(id: number) {
    this.odpowiedzWtrakcie = id;
    this.odpowiedz = ''; 
    this.showOdpowiedzModal = true;
  }

  closeOdpowiedzModal() {
    this.showOdpowiedzModal = false;
  }

  submitOdpowiedz(id: number) {
    console.log(`Odpowiedź dla zgłoszenia ID ${id}: ${this.odpowiedz}`);
    this.odpowiedzDoWyslania!.odpowiedz = this.odpowiedz
    this.zgloszenieService.odpowiedz(id, this.odpowiedzDoWyslania).subscribe(
      () => {
        this.zgloszenieService.emitZgloszenieChanged();
      },
      (error) => {
        console.error("Nie udało się dodać odpowiedz.", error)
      }
    )
    this.closeOdpowiedzModal();
  }

  openModal(content: string) {
    this.modalContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalContent = '';
  }

  openDeleteModal(id: number) {
    this.usuwaneZgloszenie = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    if (this.usuwaneZgloszenie !== null){
      this.usuwaneZgloszenie = null;
    }
    this.showDeleteModal = false; 
  }

  confirmDelete(){
    this.showDeleteModal = false; 
    this.usunZgloszenie(this.usuwaneZgloszenie!);
  }
}
