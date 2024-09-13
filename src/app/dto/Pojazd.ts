export interface Pojazd {
    id: number;
    typ: string;
    marka: string;
    model: string;
    rodzajSkrzyni: string;
    rodzajPaliwa: string;
    rokProdukcji: number;
    dostepny: boolean;
    cenaK: number;
    cenaD: number;
    sciezkaDoZdjecia: string;
}