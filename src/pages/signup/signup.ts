import { Login } from './../login/login';
import { Component } from '@angular/core';
import { FirebaseAuthState } from 'angularfire2';
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Loading, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  signupForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public userService: UserService,
    public authService: AuthService,
    public alertCtrl: AlertController) {

    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      //email: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    //Verifica se já existe usuário com aquele username na base.
    this.userService.userExists(username).first()
    .subscribe((userExists: boolean) => {
        if(!userExists)
        {
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState: FirebaseAuthState) => {
      
            delete formUser.password;
            let uuid: string = authState.auth.uid;
            //formUser.uid = authState.auth.uid;
      
            this.userService.create(formUser, uuid)
              .then(() => {
                console.log("Usuário cadastrado com sucesso!");
                this.navCtrl.setRoot(Login);
                loading.dismiss();
              }).catch((error: any) => {
                console.log(error);
                loading.dismiss();
                this.showAlert(error);
              });
      
          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });
        }
        else
        {
          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
          loading.dismiss();
        }
    });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }


}
