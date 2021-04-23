import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinesspagePageRoutingModule } from './businesspage-routing.module';

import { BusinesspagePage } from './businesspage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinesspagePageRoutingModule
  ],
  declarations: [BusinesspagePage]
})
export class BusinesspagePageModule {}
