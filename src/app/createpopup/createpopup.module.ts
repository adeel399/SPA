import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatepopupPageRoutingModule } from './createpopup-routing.module';

import { CreatepopupPage } from './createpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatepopupPageRoutingModule
  ],
  declarations: [CreatepopupPage]
})
export class CreatepopupPageModule {}
