import { Pet } from './pet.model';

export class User {
    constructor(
        public name: string,
        public username: string,
        public email: string,
        public photo: string
        //public pet: Pet
    ){}
}