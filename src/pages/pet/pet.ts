import { EditPetPage } from './edit-pet/edit-pet';
import { ImageService } from './../../providers/image.service';
import { Observable } from 'rxjs/Observable';
import { Pet } from './../../models/pet.model';
import { User } from './../../models/user.model';
import { PetService } from './../../providers/pet.service';
import { UtilsService } from './../../providers/utils.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { PageTitle } from './../../pipes/page-title';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';


@Component({
  selector: 'page-pet',
  templateUrl: 'pet.html',
})
export class PetPage {
  public title: string;
  public pets: Observable<Pet[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pageTitlePipe: PageTitle,
    public formBuilder: FormBuilder,
    public utilsService: UtilsService,
    public petService: PetService,
    public imageService: ImageService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad(): void {
    this.title = this.pageTitlePipe.transform(PetPage.name + 's');
    this.loadUserPets();
  }

  loadUserPets() {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    loading.present().then(() => {
      this.pets = this.petService.pets.map((pets: Pet[]) => {
        loading.dismiss();
        
        pets.forEach(
          (pet: Pet) => {
           this.petService.getPetImage(pet.$key).then((url: string) => {
             pet.image = url;
           });
          }
        );

        return pets;
      });
    });
  }

  navEditPet(petEdit?: Pet) {
    this.navCtrl.push(EditPetPage, {
      pet: petEdit
    });
  }

  takePicture(pet: Pet) {
    this.imageService.takePicture(pet.$key);
  }
}