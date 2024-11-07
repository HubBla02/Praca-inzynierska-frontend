import { Pojazd } from "./Pojazd";

export interface WypozyczenieDTO {
    uzytkownikEmail: string,
    pojazdId: number,
    pojazd?: Pojazd,
    cena: number,
    dataRozpoczecia: Date,
    dataZakonczenia: Date,
    czyZakonczone: boolean
}