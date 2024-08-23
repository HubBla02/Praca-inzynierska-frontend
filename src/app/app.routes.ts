import { Routes } from '@angular/router';
import { UzytkownicyComponent } from './components/uzytkownicy/uzytkownicy.component';
import { PojazdyComponent } from './components/pojazdy/pojazdy.component';
import { EdytujPojazdComponent } from './components/edytuj-pojazd/edytuj-pojazd.component';
import { DodajPojazdComponent } from './components/dodaj-pojazd/dodaj-pojazd.component';

export const routes: Routes = [
    { path: 'uzytkownik/lista', component: UzytkownicyComponent},
    { path: 'pojazd/lista', component: PojazdyComponent},
    { path: 'pojazd/dodaj', component: DodajPojazdComponent},
    { path: 'pojazd/:id/edytuj', component: EdytujPojazdComponent}

];

