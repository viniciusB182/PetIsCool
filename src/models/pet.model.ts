import { Medicamento } from './medicamento.model';
import { Vacina } from './vacina.model';
import { Raca } from './raca.model';
import { DateTime } from "ionic-angular";

export class Pet {

    public $key: string;
    public image: string;

    constructor(
        public nome: string,
        public dataNascimento: DateTime,
        public raca: string,
        public especie: string,
        public peso: string,
        public porte: number,
        public genero: number,
    ){}
}