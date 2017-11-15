import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { ImageService } from './image.service';
import { UtilsService } from './utils.service';
import { BaseService } from "./base.service";

import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';

import { User } from './../models/user.model';
import { Pet } from './../models/pet.model';
import { Loading } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PetService extends BaseService {
  public pets: FirebaseListObservable<Pet[]>;
  public pet: Pet;

  constructor(
    public http: Http,
    public af: AngularFire,
    public userService: UserService,
    public utilsService: UtilsService,
    public imageService: ImageService) {
    super();
    this.listPets(userService.currentUserUid);
  }

  create(pet: Pet, uuid: string): firebase.Promise<void> {
    return this.af.database.object(`/pets/${uuid}/${this.generateKey()}`)
      .set(pet)
      .catch(this.handlePromiseError);
  }

  update(pet: Pet, uuid: string, petUuid: string): firebase.Promise<void> {
    return this.af.database.object(`/pets/${uuid}/${petUuid}`)
    .update(pet)
    .catch(this.handlePromiseError);
  }

  delete(uuid: string, petUuid: string): firebase.Promise<void> {
    return this.af.database.object(`/pets/${uuid}/${petUuid}`)
    .remove()
    .catch(this.handlePromiseError);
  }

  private listPets(uuid: string) {
    this.af.auth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        return this.pets = <FirebaseListObservable<Pet[]>>this.af.database.list(`/pets/${uuid}`);
      }
    });
  }

  getPetImage(uuid: string) {
    return this.imageService.getImage(uuid);
  }

}
