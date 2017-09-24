import { Medicamento } from './medicamento.model';
import { Vacina } from './vacina.model';
import { Raca } from './raca.model';
import { DateTime } from "ionic-angular";

export class Pet {
    constructor(
        public nome: string,
        //public peso: number,
        public dataNascimento: DateTime,
        public raca: Raca,
        public especie: string,
        //public vacinas: Array<Vacina>,
        //public medicamentos: Array<Medicamento>
    ){}
}