import { SchedulingService } from './../providers/scheduling.service';
import { ImageService } from './../providers/image.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { AngularFireModule, FirebaseAppConfig, AuthProviders, AuthMethods } from 'angularfire2';
import { AgmCoreModule } from '@agm/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from './../pages/login/login';
import { Signup } from './../pages/signup/signup';
import { PetPage } from './../pages/pet/pet';
import { WalkPage } from './../pages/walk/walk';
import { EditPetPage } from './../pages/pet/edit-pet/edit-pet';
import { SchedulingPage } from './../pages/scheduling/scheduling';
import { EditSchedulingPage } from './../pages/scheduling/edit-scheduling/edit-scheduling';

import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { PolaroidPetComponent } from './../components/polaroid-pet/polaroid-pet.component';

import { AuthService } from './../providers/auth.service';
import { UserService } from './../providers/user.service';
import { UtilsService } from './../providers/utils.service';
import { PetService } from './../providers/pet.service';

import { PageTitle } from './../pipes/page-title';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBrY7LxhRdEU_1NU_h-zq4MgtrPX6apB34",
  authDomain: "petiscool-b2b4a.firebaseapp.com",
  databaseURL: "https://petiscool-b2b4a.firebaseio.com",
  storageBucket: "petiscool-b2b4a.appspot.com"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Signup,
    PetPage,
    PageTitle,
    WalkPage,
    EditPetPage,
    SchedulingPage,
    EditSchedulingPage,
    CustomLoggedHeaderComponent,
    PolaroidPetComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyBcz6zhzT3GHS_nY_roD3fFPX8wFCXLYh4'
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    PetPage,
    Signup,
    WalkPage,
    EditPetPage,
    SchedulingPage,
    EditSchedulingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthService,
    UtilsService,
    PetService,
    ImageService,
    SchedulingService,
    PageTitle,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
