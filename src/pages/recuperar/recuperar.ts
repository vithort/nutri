import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  @ViewChild('email') emailDigitado;

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,public toastCtrl: ToastController
    ,public fire: AngularFireAuth
  ) {
  }

  recuperar() {
    let toast = this.toastCtrl.create({duration: 2000, position: "bottom"});

    this.fire.auth.sendPasswordResetEmail(this.emailDigitado.value)
    .then(() => {
      toast.setMessage('A solicitação foi enviada para o email digitado!');
      toast.present();

      this.navCtrl.pop();
    })
    .catch((error: any) => {
      //https://firebase.google.com/docs/reference/js/firebase.auth.Auth
      if (error.code == 'auth/invalid-email') {
        //Thrown if the email address is not valid.
        toast.setMessage('Email inválido!');
      } else if (error.code == 'auth/user-not-found') {
        //Thrown if there is no user corresponding to the email address.
        toast.setMessage('Usuário não encontrado!');
      }
      toast.present();
    });
  }

}
