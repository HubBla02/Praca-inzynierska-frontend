
export interface Uzytkownik {
    id: number;
    email: string;
    imie: string;
    nazwisko: string;
    dataUrodzenia: Date;
    rolaId: number;
    czyTrzezwy: boolean;
    czyZablokowany: boolean;
  }
  