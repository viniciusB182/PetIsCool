import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import { PetService } from './../../providers/pet.service';
import { UtilsService } from './../../providers/utils.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { PageTitle } from './../../pipes/page-title';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { Component } from '@angular/core';
import { CreatePetPage } from './../pet/create-pet/create-pet';


@Component({
  selector: 'page-pet',
  templateUrl: 'pet.html',
})
export class PetPage { 
  public title: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pageTitlePipe: PageTitle,
    public formBuilder: FormBuilder,
    public utilsService: UtilsService,
    public petService: PetService,
    public userService: UserService) { }

    ionViewDidLoad(): void {
      this.title = this.pageTitlePipe.transform(PetPage.name);
    }

  navegarCriarAnimal() {
    this.navCtrl.push(CreatePetPage);
  }
}