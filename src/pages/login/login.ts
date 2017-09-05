import { HomePage } from './../home/home';
import { Signup } from './../signup/signup';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  } 

  onSignUp():void
  {
    this.navCtrl.push(Signup);
  }

  onLogIn():void
  {
    this.navCtrl.push(HomePage);
  }

}
