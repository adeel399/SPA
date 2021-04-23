import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { AlbumPageRoutingModule } from './album-routing.module';

import { AlbumPage } from './album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxIonicImageViewerModule,
    IonicModule,
    AlbumPageRoutingModule
  ],
  declarations: [AlbumPage]
})
export class AlbumPageModule {}
