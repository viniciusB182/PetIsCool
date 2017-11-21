import { DateTime } from "ionic-angular";

export class Pet {

    public $key: string;
    public image: string;

    constructor(
        public nome: string,
        public dataNascimento: Date,
        public raca: string,
        public especie: string,
        public peso: string,
        public porte: number,
        public genero: number,
    ){}
}