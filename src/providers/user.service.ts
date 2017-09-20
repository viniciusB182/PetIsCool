import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from "angularfire2";
import { User } from "../models/user.model";
import { BaseService } from "./base.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService extends BaseService {

  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;
  currentUserUid: string;

  constructor(
    public http: Http,
    public af: AngularFire) {

    super();
    this.users = this.af.database.list(`/users`);
    this.listenAuthState();
  }

  private listenAuthState(): void {
    this.af.auth.subscribe((authState: FirebaseAuthState) => {
      //Se existir um usuário logado
      if (authState) {
        this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
        this.currentUserUid = authState.auth.uid;
      }
    });
  }


  create(user: User, uuid: string): firebase.Promise<void> {
    //return this.users.push(user);
    return this.af.database.object(`/users/${uuid}`)
      .set(user).catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.af.database.list(`/users`, {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);

  }
}
