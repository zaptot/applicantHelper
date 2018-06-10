import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ModalController} from 'ionic-angular';
import 'rxjs/operator/filter';
import { ReaderProvider } from "../../providers/reader/reader";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items;
  public req: string;
  constructor(public navCtrl: NavController, public newHttp: HttpClient, public modal: ModalController, public http: ReaderProvider) {
    this.getdata();
  }
  getdata(){
    this.newHttp.get("assets/data/univs.json").subscribe(data => {
      this.items = data;
      //console.log(this.resData);
    });
  }

  ionViewWillLoad() {
    this.items = this.http.readAll();
  }
  initializeItems() {
   this.items = this.http.readAll();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.req = val;
    // if the value is an empty string don't filter the items
    if (this.items && val && val.trim() != '') {
        this.items = this.items.filter((item) => {
        if(item.univ_name.toLowerCase().indexOf(val.toLowerCase()) > -1) return true;
        else{
          for (let i of item.faculties){
            if(i.fac_name.toLowerCase().indexOf(val.toLowerCase()) > -1) return true;
            else{
                for(let j of i.specs){
                  if(j.spec_name.toLowerCase().indexOf(val.toLowerCase()) > -1) return true;
                }
            }
          }
        }
        })

      for(let fac of this.items){
        fac.faculties = fac.faculties.filter((fac) => {
            for(let j of fac.specs) {
              if (j.spec_name.toLowerCase().indexOf(val.toLowerCase()) > -1) return true;
              else{

              }
            }
          }
        )
      }


    }
  }

  openModal(faculty, req){
    const myModal = this.modal.create("ModalPage", {data: faculty, req: req});
    myModal.present();

  }
}
