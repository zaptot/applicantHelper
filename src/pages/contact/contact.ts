import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public a = false;
  public rulesStart=[
    ["Записаться на ЦТ",false],
    ["Написать ЦТ",false],
    ["Забрать сертивикаты ЦТ",false],
    ["Получить справку о состоянии здоровья",false],
    ["Выбрать ВУЗ и факультет",false],
    ["Подать документы",false]
  ];
  public rules;
  public states: object[] = [];
  public current:string;
  public ch:Boolean = false;
  constructor(public navCtrl: NavController, public storage:Storage, public alertCtrl:AlertController) {
    storage.get("rules").then((val) => {
      if(val){
        this.rules = val;
      }
      else {
        this.rules = this.rulesStart;
        storage.set("rules", this.rulesStart);
      }
    }
    )
  }

  onViewWillLoad(){
    this.storage.get("rules").then((val) => {
        if(val){
          this.rules = val;
        }
        else {
          this.rules = this.rulesStart;
          this.storage.set("rules", this.rulesStart);
        }
      }
    )
  }
  toggleRule(rule){
    this.rules[this.rules.indexOf(rule)][1] = !this.rules[this.rules.indexOf(rule)][1];
    this.storage.set("rules", this.rules);
  }

  add() {
    let alert = this.alertCtrl.create({
      title: 'Добавить',
      inputs: [
        {
          name: 'put'
        }
      ],
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Добавить',
          handler: data => {
            console.log(data.put);
            if(data.put){
              this.rules.push([data.put, false]);
              this.storage.set("rules", this.rules);
            }
          }
        }
      ]
    });
    alert.present();
  }

  toggleChange(){
    this.ch = !this.ch;
    console.log(this.ch);
  }

  removeRule(rule){
    this.rules.splice(this.rules.indexOf(rule), 1);
    this.storage.set("rules", this.rules);
  }
}
