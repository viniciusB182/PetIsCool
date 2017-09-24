import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from './../models/user.model';
import { Pet } from './../models/pet.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "./base.service";

@Injectable()
export class PetService extends BaseService {
  lista: FirebaseListObservable<any>;
  public pet: Pet;
  
  constructor(public http: Http,
    public af: AngularFire) {
    super();
  }

  create(pet: Pet, uuid: string): firebase.Promise<void> {
    return this.af.database.object(`/pets/${uuid}/${this.generateKey()}`)
      .set(pet)
      .catch(this.handlePromiseError);
  }

  list(uuid: string) {
    return firebase.database().ref('/pets/' + uuid)
      .once('value')
      .then(function(snapshot) {
      var nome = snapshot.val().nome;
    });
  }
}
