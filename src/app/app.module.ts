import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG  } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicGestureConfig } from './gesture/IonicGestureConfig'
import { Stripe } from '@ionic-native/stripe/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,NgxIonicImageViewerModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule],
  providers: [
    HttpClient,
    Camera,
    Stripe,
    PhotoViewer,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
