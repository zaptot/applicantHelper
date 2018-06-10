import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';

import 'rxjs/operator/filter';
/**
 * Generated class for the ModalPageDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-page-description',
  templateUrl: 'modal-page-description.html',
})
export class ModalPageDescriptionPage {
  public spec;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  	this.spec = this.navParams.get("data");
  }

  ionViewWillLoad() {
  }
  closeModal() {
    this.view.dismiss();
  }
}
