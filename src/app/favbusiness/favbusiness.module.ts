import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavbusinessPageRoutingModule } from './favbusiness-routing.module';

import { FavbusinessPage } from './favbusiness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavbusinessPageRoutingModule
  ],
  declarations: [FavbusinessPage]
})
export class FavbusinessPageModule {}
