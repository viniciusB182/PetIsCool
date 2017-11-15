import { ImageService } from './../../providers/image.service';
import { UserService } from './../../providers/user.service';
import { UtilsService } from './../../providers/utils.service';
import { PetService } from './../../providers/pet.service';
import { PageTitle } from './../../pipes/page-title';
import { AuthService } from './../../providers/auth.service';
import { AlertController, App, MenuController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base.component";

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent{

  @Input() title: string;

  constructor(
    public alertCtrl: AlertController,
    public petService: PetService,
    public authService: AuthService,
    public utilsService: UtilsService,
    public userService: UserService,
    public imageService: ImageService,
    public app: App,
    public menuCtrl: MenuController) { 
    super(alertCtrl, petService, authService, utilsService, userService, imageService, app, menuCtrl);  
  }

}
