import { UtilsService } from './../../providers/utils.service';
import { HomePage } from './../home/home';
import { Signup } from './../signup/signup';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public utilsService: UtilsService) {

    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;

    this.loginForm = this.formBuilder.group({
      email: ['vinicius@email.com', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['vinicius123', [Validators.required, Validators.minLength(6)]]
    });

  }

  ionViewDidLoad() {
    this.onSignUp();
  }

  onSignUp(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    let loading = this.utilsService.showLoading();

    this.authService.signinWithEmail(this.loginForm.value)
      .then((isLogged: boolean) => {
        if (isLogged) {
          //Navegacao sem empilhamento
          this.navCtrl.setRoot(HomePage)
          loading.dismiss();
        }
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.utilsService.showAlert(error);
      });
  }

}
