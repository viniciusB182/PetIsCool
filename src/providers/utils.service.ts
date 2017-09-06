import { Injectable } from '@angular/core';
import { Loading, AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class UtilsService {

    constructor(
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {

    }

    showLoading(): Loading {
        let loading: Loading = this.loadingCtrl.create({
            content: 'Aguarde...'
        });

        loading.present();

        return loading;
    }

    showAlert(message: string) {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    }
}