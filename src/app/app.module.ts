import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from './../pages/login/login';
import { Signup } from './../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AuthService } from './../providers/auth.service';
import { UserService } from './../providers/user.service';


const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBrY7LxhRdEU_1NU_h-zq4MgtrPX6apB34",
  authDomain: "petiscool-b2b4a.firebaseapp.com",
  databaseURL: "https://petiscool-b2b4a.firebaseio.com",
  storageBucket: "petiscool-b2b4a.appspot.com"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Signup
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
