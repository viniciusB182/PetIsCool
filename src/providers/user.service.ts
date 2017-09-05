import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { User } from "../models/user.model";

@Injectable()
export class UserService {

  users: FirebaseListObservable<User[]>;

  constructor(public http: Http,
              public af: AngularFire) {
      
      this.users = this.af.database.list(`/users`);
  }

  create(user: User): firebase.Promise<void>
  {
    //return this.users.push(user);
    return this.af.database.object(`/users/${user.uid}`)
                            .set(user);
  }

}
