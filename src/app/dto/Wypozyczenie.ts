import { Pojazd } from "./Pojazd";

export interface Wypozyczenie {
    id: number,
    uzytkownikEmail: string,
    pojazdId: number,
    pojazd: Pojazd,
    cena: number,
    dataRozpoczecia: Date,
    dataZakonczenia: Date
}