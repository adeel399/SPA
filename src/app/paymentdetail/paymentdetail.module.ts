import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentdetailPageRoutingModule } from './paymentdetail-routing.module';

import { PaymentdetailPage } from './paymentdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentdetailPageRoutingModule
  ],
  declarations: [PaymentdetailPage]
})
export class PaymentdetailPageModule {}
