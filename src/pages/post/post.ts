import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { WordpressService } from '../../services/wordpress.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { RecaptchaVerifier_Instance } from '@firebase/auth-types';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: any;
  user: string;
  categories: Array<any> = new Array<any>();

  constructor(
    public navCtrl: NavController
    ,public navParams: NavParams
    ,public loadingCtrl: LoadingController
    ,public wordpressService: WordpressService
  ) {
  }

  ionViewWillEnter() {
    
    let loading = this.loadingCtrl.create();
    loading.present();
    this.post = this.navParams.get('item');

    Observable.forkJoin(
      this.getAuthorData()
      ,this.getCategories()
    )
    .subscribe(data => {
      this.user = data[0].name;
      this.categories = data[1];
      loading.dismiss();
    });
  }

  getAuthorData() {

    return this.wordpressService.getAuthor(this.post.author);
  }

  getCategories() {

    return this.wordpressService.getPostCategories(this.post);
  }

}
