import { Uzytkownik } from "./Uzytkownik";

export interface Opinia {
    id: number;
    autorId: number;
    autor: Uzytkownik
    ocena: number;
    opis: string;
}