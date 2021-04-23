import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareviaPageRoutingModule } from './sharevia-routing.module';

import { ShareviaPage } from './sharevia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareviaPageRoutingModule
  ],
  declarations: [ShareviaPage]
})
export class ShareviaPageModule {}
