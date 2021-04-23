import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentdetailPage } from './paymentdetail.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentdetailPageRoutingModule {}
