import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

/*
  Generated class for the ReaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReaderProvider {
  resData: object;

  constructor(public http: HttpClient) {
  }
  readAll(){
    let url = "assets/data/univs.json";
    this.http.get(url).subscribe(data => {

      this.resData = data;
      //console.log(this.resData);
    });
    return this.resData;
  }

}

