import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,NgxIonicImageViewerModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule],
  providers: [
    HttpClient,
    Camera,
    PhotoViewer,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
