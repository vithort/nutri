import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  email: string;
  nome: string;

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,public fire: AngularFireAuth
    ,public toastCtrl: ToastController
  ) {

    this.email = fire.auth.currentUser.email;
    this.nome = fire.auth.currentUser.displayName; //nao implementado ainda
  }

  logout() {

    let toast = this.toastCtrl.create({duration: 2000, position: 'bottom'});
    this.fire.auth.signOut();
    toast.setMessage('Deslogado com sucesso!');
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

}