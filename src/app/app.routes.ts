import { Routes } from '@angular/router';
import { UzytkownicyComponent } from './components/uzytkownicy/uzytkownicy.component';
import { PojazdyComponent } from './components/pojazdy/pojazdy.component';
import { EdytujPojazdComponent } from './components/edytuj-pojazd/edytuj-pojazd.component';
import { DodajPojazdComponent } from './components/dodaj-pojazd/dodaj-pojazd.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RejestracjaComponent } from './components/rejestracja/rejestracja.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { RoleGuard } from './guards/rola.guard';
import { DodajZdjecieComponent } from './components/dodaj-zdjecie/dodaj-zdjecie.component';
import { WypozyczenieComponent } from './components/wypozyczenie/wypozyczenie.component';
import { ListaWypozyczenComponent } from './components/lista-wypozyczen/lista-wypozyczen.component';
import { MojeWypozyczeniaComponent } from './components/moje-wypozyczenia/moje-wypozyczenia.component';
import { ListaZgloszenComponent } from './components/lista-zgloszen/lista-zgloszen.component';
import { MojeZgloszeniaComponent } from './components/moje-zgloszenia/moje-zgloszenia.component';
import { UtworzZgloszenieComponent } from './components/utworz-zgloszenie/utworz-zgloszenie.component';
import { AlkomatComponent } from './components/alkomat/alkomat.component';
import { OpinieComponent } from './components/opinie/opinie.component';
import { UtworzOpinieComponent } from './components/utworz-opinie/utworz-opinie.component';
import { RaportComponent } from './components/raport/raport.component';

export const routes: Routes = [
    { path: '', redirectTo: 'strona-glowna', pathMatch: 'full' }, 
    { path: 'strona-glowna', component: HomeComponent }, 
    { path: 'opinie', component: OpinieComponent }, 
    { path: "opinie/utworz", component: UtworzOpinieComponent},
    { path: 'logowanie', component: LoginComponent},
    { path: 'rejestracja', component: RejestracjaComponent},
    { path: 'przegladaj', component: OfertaComponent},
    { path: 'moje', component: MojeWypozyczeniaComponent},
    { path: "zgloszenia/moje", component: MojeZgloszeniaComponent},
    { path: "zgloszenia/moje/utworz", component: UtworzZgloszenieComponent},
    { path: "alkomat", component: AlkomatComponent},
    { path: 'zgloszenia/lista', component: ListaZgloszenComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin'}},
    { path: 'uzytkownik/lista', component: UzytkownicyComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' }}, 
    { path: 'pojazd/lista', component: PojazdyComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
    { path: 'wypozyczenie/lista', component: ListaWypozyczenComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
    { path: 'wypozyczenie/lista/raport', component: RaportComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
    { path: 'pojazd/dodaj', component: DodajPojazdComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
    { path: 'pojazd/:id/edytuj', component: EdytujPojazdComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
    { path: 'dodaj-zdjecie/:id', component: DodajZdjecieComponent, canActivate: [RoleGuard], data: {expectedRole: 'Admin'} },
    { path: 'wypozyczenie/:id', component: WypozyczenieComponent },
    { path: 'nie-znaleziono-strony', component: NotFoundComponent },
    { path: '**', redirectTo: 'nie-znaleziono-strony' },
  ];

