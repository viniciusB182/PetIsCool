import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PageTitle } from "../../pipes/page-title";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public title: string;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              private pageTitlePipe: PageTitle) {     
  }

  ionViewDidLoad():void {
    this.title = this.pageTitlePipe.transform(HomePage.name);
  }

  ionViewCanEnter(): Promise<boolean>
  {
    //Verifica se usuário está logado para acessar a aplicacao
    return this.authService.authenticated;
  }
}
