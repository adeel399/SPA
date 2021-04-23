import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcardpopupPageRoutingModule } from './addcardpopup-routing.module';

import { AddcardpopupPage } from './addcardpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcardpopupPageRoutingModule
  ],
  declarations: [AddcardpopupPage]
})
export class AddcardpopupPageModule {}
