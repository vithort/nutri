import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DicasPage } from '../dicas/dicas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(
    public navCtrl: NavController
    ,public toastCtrl: ToastController
  ) {

  }

  entrar() {

    //console.log("O usuário digitado foi: ", this.email.value);
    //console.log("A senha digitada foi: ", this.password.value);
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    
    if (this.email.value == "vithor" && this.password.value == "123") {

      this.navCtrl.push(DicasPage);
      toast.setMessage('Logado com sucesso!');
      toast.present();

    } else {

      toast.setMessage('Usuario ou senha não encontrado!');
      toast.present();

    }
    
  }

}
