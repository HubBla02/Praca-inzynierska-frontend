import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UzytkownicyComponent } from './components/uzytkownicy/uzytkownicy.component';
import { CommonModule } from '@angular/common';
import { PojazdyComponent } from './components/pojazdy/pojazdy.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UzytkownicyComponent, PojazdyComponent, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'CarrentlyTheBestFrontend';
}
