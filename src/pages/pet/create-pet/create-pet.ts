import { User } from './../../../models/user.model';
import { UserService } from './../../../providers/user.service';
import { PetService } from './../../../providers/pet.service';
import { UtilsService } from './../../../providers/utils.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { PageTitle } from './../../../pipes/page-title';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'create-page-pet',
  templateUrl: 'create-pet.html',
})
export class CreatePetPage {

  public title: string;
  petForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pageTitlePipe: PageTitle,
    public formBuilder: FormBuilder,
    public utilsService: UtilsService,
    public petService: PetService,
    public userService: UserService) {

    this.petForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ionViewDidLoad(): void {
    this.title = this.pageTitlePipe.transform(CreatePetPage.name);
  }

  onSubmit(): void {
    let loading: Loading = this.utilsService.showLoading();
    let formPet = this.petForm.value;
    let uuid = this.userService.currentUserUid;

    this.petService.create(formPet, uuid)
      .then(() => {
        loading.dismiss();
        this.utilsService.showAlert("Pet cadastrado com sucesso!");
      })
      .catch((error: any) => {
        loading.dismiss();
        this.utilsService.showAlert(error);
      });
  }
}
