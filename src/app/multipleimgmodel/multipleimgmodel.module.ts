import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipleimgmodelPageRoutingModule } from './multipleimgmodel-routing.module';

import { MultipleimgmodelPage } from './multipleimgmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipleimgmodelPageRoutingModule
  ],
  declarations: [MultipleimgmodelPage]
})
export class MultipleimgmodelPageModule {}
