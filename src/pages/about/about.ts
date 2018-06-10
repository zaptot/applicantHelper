import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public exams:string[]=[
    "Русский/Белорусский язык",
    "Обществоведение",
    "Математика",
    "Биология",
    "Иностранный язык",
    "Химия",
    "Физика",
    "История Беларуси",
    "География",
    "Всемирная история (новейшее время)"
  ];
  public active:string[] = [];
  public isToastActive:number = 0;

  constructor(public toastCtrl: ToastController, public modal: ModalController) {
  }

  toggleCh(ch:string){
    if(this.active.indexOf(ch) >= 0){
      this.active.splice(this.active.indexOf(ch), 1);
    }
    else{
      this.active.push(ch);
    }
  }
  f(){
    if(this.active.length != 3 && this.isToastActive==0) {
      this.isToastActive = 1;
      let toast = this.toastCtrl.create({
        message: "Неверное количество цт",
        duration: 15000,
        showCloseButton: true,
        closeButtonText: 'Исправить',
        dismissOnPageChange: true,
        cssClass: "Toast",

      });
      toast.onDidDismiss(()=>{
        this.isToastActive = 0;
      });
      toast.present();
    }
    else if(this.active.length == 3 && this.isToastActive==0){
      const myModal = this.modal.create("ModalSearchPage", {data: this.active});
      myModal.present();
    }
  }
}
