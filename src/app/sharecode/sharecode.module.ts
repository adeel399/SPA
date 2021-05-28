import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharecodePageRoutingModule } from './sharecode-routing.module';

import { SharecodePage } from './sharecode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharecodePageRoutingModule
  ],
  declarations: [SharecodePage]
})
export class SharecodePageModule {}
