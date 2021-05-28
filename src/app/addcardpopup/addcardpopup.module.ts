import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcardpopupPageRoutingModule } from './addcardpopup-routing.module';

import { AddcardpopupPage } from './addcardpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddcardpopupPageRoutingModule
  ],
  declarations: [AddcardpopupPage]
})
export class AddcardpopupPageModule {}
