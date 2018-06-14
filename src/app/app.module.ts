import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DicasPage } from '../pages/dicas/dicas';
import { RecuperarPage } from '../pages/recuperar/recuperar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';

import { WordpressService } from '../services/wordpress.service';

const firebaseAuth = {
  apiKey: "AIzaSyAX5Bki0llpVU54rk_jVZIOV2WJvn3RqDc"
  ,authDomain: "nutri-1a072.firebaseapp.com"
  ,databaseURL: "https://nutri-1a072.firebaseio.com"
  ,projectId: "nutri-1a072"
  ,storageBucket: "nutri-1a072.appspot.com"
  ,messagingSenderId: "34362959994"
};

@NgModule({
  declarations: [
    MyApp
    ,HomePage
    ,DicasPage
    ,RegisterPage
    ,RecuperarPage
    ,ProfilePage
  ],
  imports: [
    BrowserModule
    ,IonicModule.forRoot(MyApp)
    ,AngularFireAuthModule
    ,AngularFireModule.initializeApp(firebaseAuth)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    ,HomePage
    ,DicasPage
    ,RegisterPage
    ,RecuperarPage
    ,ProfilePage
  ],
  providers: [
    StatusBar
    ,SplashScreen
    ,{provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
