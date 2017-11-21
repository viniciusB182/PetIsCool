import { ImageService } from './../providers/image.service';
import { Pet } from './../models/pet.model';
import { UserService } from './../providers/user.service';
import { Login } from './../pages/login/login';
import { AuthService } from './../providers/auth.service';
import { PetService } from './../providers/pet.service';
import { UtilsService } from './../providers/utils.service';
import { NavController, AlertController, MenuController, App, Loading } from 'ionic-angular';
import { OnInit } from "@angular/core";
export abstract class BaseComponent implements OnInit {
    protected navCtrl: NavController;

    constructor(public alertCtrl: AlertController,
        public petService: PetService,
        public authService: AuthService,
        public utilsService: UtilsService,
        public userService: UserService,
        public imageService: ImageService,
        public app: App,
        public menuCtrl: MenuController
    ) { }

    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout(): void {
        this.alertCtrl.create({
            message: "Deseja sair?",
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.authService.logout()
                            .then(() => {
                                this.navCtrl.setRoot(Login);
                            });
                    }
                },
                {
                    text: 'Não'
                }
            ]
        }).present();
    }

    removePet(petUuid: string): void {
        let uuid: string = this.userService.currentUserUid;

        this.alertCtrl.create({
            message: "Confirmar exclusão?",
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {

                        let loading: Loading = this.utilsService.showLoading();

                        this.petService.delete(uuid, petUuid).then(() => {
                            loading.dismiss();
                            this.utilsService.showAlert("Pet Excluído!");
                            this.navCtrl.pop();
                        }).catch((error: any) => {
                            loading.dismiss();
                            this.utilsService.showAlert(error);
                            this.navCtrl.pop();
                        });

                    }
                },
                {
                    text: 'Não',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                }
            ]
        }).present();
    }
}