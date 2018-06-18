import { Component, ViewChild, style } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Users } from './users';
import { RecuperarPage } from '../recuperar/recuperar';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  users: Users = new Users();

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(
    public navCtrl: NavController
    ,public toastCtrl: ToastController
    ,public fire: AngularFireAuth
  ) {

    this.tabBarElement = document.querySelector('.show-tabbar');

  }

  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  entrar() {

    //console.log("O usuário digitado foi: ", this.email.value);
    //console.log("A senha digitada foi: ", this.password.value);
    let toast = this.toastCtrl.create({duration: 2000, position: 'bottom'});
    
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      
      //casos de sucesso
      console.log('data do login: ', data);
      this.users.email = this.email.value;
      this.users.senha = this.password.value;
      this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) => {

      //casos de erro
      if (error.code == 'auth/invalid-email') {
        // Thrown if the email address is not valid.
        toast.setMessage('E-mail inválido!');
      } else if (error.code == 'auth/user-disabled') {
        // Thrown if the user corresponding to the given email has been disabled.
        toast.setMessage('Esse usuário foi desabilitado!');
      } else if (error.code == 'auth/user-not-found') {
        // Thrown if there is no user corresponding to the given email.
        toast.setMessage('Usuário não encontrado!');
      } else if (error.code == 'auth/wrong-password') {
        // Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
        toast.setMessage('Senha errada!');
      }
      toast.present();
    });

  }

  cadastrar() {

    this.navCtrl.push(RegisterPage);
  }

  recuperar() {

    this.navCtrl.push(RecuperarPage);
  }

  loginFacebook() {
    this.fire.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider())
    .then(res => {
      
      //console.log(res);
      this.navCtrl.setRoot(TabsPage);
    })

  }

  loginVisitante() {

    let toast = this.toastCtrl.create({duration: 2000, position: 'bottom'});

    this.fire.auth.signInAnonymously()
    .then(data => {
      
      console.log('Data do anonimo', data);
      this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) => {
      if (error.code == 'auth/operation-not-allowed') {
        //Thrown if anonymous accounts are not enabled. Enable anonymous accounts in the Firebase Console, under the Auth tab.
        toast.setMessage('O modo visitante está desabilitado!');
      } else {
        console.log('Error: ', error);
      }
      toast.present();
    });

  }

}
