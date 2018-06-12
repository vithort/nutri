import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

}
