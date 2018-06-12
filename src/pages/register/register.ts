import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { DicasPage } from '../dicas/dicas';


@IonicPage()
@Component({
  selector: 'page-register'
  ,templateUrl: 'register.html'
})
export class RegisterPage {

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,public fire: AngularFireAuth
    ,public toastCtrl: ToastController
  ) {
  }

  registrar() {

    let toast = this.toastCtrl.create({duration: 2000, position: 'bottom'});

    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {

      console.log('aqui temos a data: ', data);
      toast.setMessage('Usuário criado com sucesso!');
      toast.present();
      this.navCtrl.setRoot(DicasPage);
    })
    .catch((error: any) => {
      
      if (error.code == 'auth/email-already-in-use') {
        //Thrown if there already exists an account with the given email address.
        toast.setMessage('O e-mail digitado já está em uso!');
      } else if (error.code == 'auth/invalid-email') {
        //Thrown if the email address is not valid.
        toast.setMessage('O e-mail digitado não é válido!');
      } else if (error.code == 'auth/operation-not-allowed') {
        //Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
        toast.setMessage('Não está habilitado criar usuários!');
      } else if (error.code == 'auth/weak-password') {
        //Thrown if the password is not strong enough.
        toast.setMessage('Ei, essa senha é muito fraca!');
      }
      toast.present();
    });
  }

}
