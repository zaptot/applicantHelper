import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ModalController } from 'ionic-angular';
import 'rxjs/operator/filter';
/**
 * Generated class for the ModalSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-search',
  templateUrl: 'modal-search.html',
})

export class ModalSearchPage {
  public items;
  public itemsEx:string[];
  public a:string;
  public b:string;
  public c:string;
  public d:string;
  public score:number;
  public show:number = 0;
  public resItems = [];
  constructor(public navParams: NavParams, private view: ViewController, public newHttp: HttpClient, public modal: ModalController) {
    this.itemsEx = this.navParams.get("data");
  }

  ionViewWillLoad() {
    this.itemsEx = this.navParams.get("data");
    this.newHttp.get("assets/data/univs.json").subscribe(data => {
      this.items = data;
      //console.log(this.resData);
    });
  }
  closeModal() {
    this.view.dismiss();
  }
  f(){
    if(parseInt(this.a)>0 && parseInt(this.b)>0 && parseInt(this.c)>0) {
      this.score = parseInt(this.a) + parseInt(this.b) + parseInt(this.c)+ parseInt(this.d);
      this.show = 1;
      this.getItems();
    }
    else{
      this.show=2;
    }
  }

  calcCount(){
    if(this.resItems) {
      for (let fac of this.resItems) {
        for (let spec of fac.specs) {
          if (spec.passing_score.free <= this.score) {
            return false;
          }
        }
      }
    }
    return true;
  }

  getItems(){
    this.newHttp.get("assets/data/univs.json").subscribe(data => {
      this.items = data;
    });

    if(this.items){
      this.items = this.items.filter((val)=>{
        return val.faculties;
      });
      this.resItems = [];
      for(let i of this.items){
        var tmp = i.faculties.filter((val)=> {
            if (val.passing_score.free <= this.score) {
              for(let ex of this.itemsEx){
                if(val.exams.indexOf(ex.toLowerCase())<0){
                  return false;
                }
              }
              return true;
            }
          }
        );
        if(tmp && tmp.length>0){
          for(let i in tmp){
            this.resItems.push(tmp[i]);
          }
        }
      }

    }
  }

  showDescription(spec) {
    const myModal = this.modal.create("ModalPageDescriptionPage", {data: spec});
    myModal.present();
  }
}
