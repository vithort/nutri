import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    
  }

  avancar() {
    this.navCtrl.setRoot(HomePage);
  }

}
