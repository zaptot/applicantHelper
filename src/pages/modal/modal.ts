import { Component } from '@angular/core';
import { IonicPage,  NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import 'rxjs/operator/filter';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  public data;
  public req: string;
  constructor(public navParams: NavParams, private view: ViewController, public modal: ModalController) {
  }

  closeModal(){
    this.view.dismiss();
  }
  ionViewWillLoad() {
    this.data = this.navParams.get("data");
    console.log(this.data);
    this.req = this.navParams.get("req");
    console.log(this.req);
    if(this.data && this.req && this.req.length > 0){
      this.data.specs = this.data.specs.filter((data) => {
          if(data.spec_name.toLowerCase().indexOf(this.req.toLowerCase()) > -1) return true;
      })
    }

  }
  showDescription(spec) {
    const myModal = this.modal.create("ModalPageDescriptionPage", {data: spec});
    myModal.present();
  }
}
