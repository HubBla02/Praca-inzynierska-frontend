# README - Frontend (Angular 17)

## Opis projektu
Aplikacja frontendowa dla systemu zarządzania wynajmem pojazdów, umożliwiająca użytkownikom rejestrację, przeglądanie ofert, wynajmowanie pojazdów oraz dodawanie opinii. Projekt został zbudowany w **Angular 17**, z dynamicznym zarządzaniem sesjami użytkowników oraz responsywnym interfejsem.

## Kluczowe funkcjonalności
- Logowanie i rejestracja użytkowników (JWT Auth)
- Dynamiczne zmiany interfejsu w zależności od roli użytkownika
- Przeglądanie dostępnych pojazdów
- Rezerwacja i zarządzanie wynajmem
- Dodawanie opinii i ocena pojazdów
- Wyświetlanie zdjęć pojazdów pobieranych z backendu
- Obsługa dat i godzin wynajmu
- System alkomatu ograniczający dostęp do wynajmu

## Technologie
- **Angular 17** (framework frontendowy)
- **Tailwind CSS** (stylizacja)
- **RxJS** (reaktywne zarządzanie danymi)
- **Angular Material** (komponenty UI)
- **JWT** (uwierzytelnianie)

## Instrukcja uruchomienia
### 1️⃣ Wymagania
- Node.js (min. v18)
- Angular CLI

### 2️⃣ Klonowanie repozytorium
```sh
git clone https://github.com/HubBla02/Praca-inzynierska-frontend.git
cd frontend
```

### 3️⃣ Instalacja zależności
```sh
npm install
```

### 4️⃣ Konfiguracja środowiska
W pliku `src/environments/environment.ts` ustaw adres backendu:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

### 5️⃣ Uruchomienie aplikacji
```sh
ng serve
```
Aplikacja uruchomi się na `http://localhost:4200/`

## 📝 Autor
Projekt stworzony przez Huberta Błaszkiewicza w ramach pracy inżynierskiej i dalszego rozwoju zawodowego.

