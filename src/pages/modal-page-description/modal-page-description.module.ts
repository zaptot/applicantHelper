import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPageDescriptionPage } from './modal-page-description';

@NgModule({
  declarations: [
    ModalPageDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPageDescriptionPage),
  ],
})
export class ModalPageDescriptionPageModule {}
