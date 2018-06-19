import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform
    ,statusBar: StatusBar
    ,splashScreen: SplashScreen
    ,ofAuth: AngularFireAuth
  ) {

      const authObserver = ofAuth.authState.subscribe(users => {

        if (users) {
          this.rootPage = TabsPage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = IntroPage;
          authObserver.unsubscribe();
        }
      })

      platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

