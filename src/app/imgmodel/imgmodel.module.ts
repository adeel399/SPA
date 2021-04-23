import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgmodelPageRoutingModule } from './imgmodel-routing.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { ImgmodelPage } from './imgmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxIonicImageViewerModule,
    IonicModule,
    ImgmodelPageRoutingModule
  ],
  declarations: [ImgmodelPage]
})
export class ImgmodelPageModule {}
