import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UzytkownicyComponent } from './components/uzytkownicy/uzytkownicy.component';
import { CommonModule } from '@angular/common';
import { PojazdyComponent } from './components/pojazdy/pojazdy.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UzytkownicyComponent, PojazdyComponent, RouterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CarrentlyTheBestFrontend';
}
