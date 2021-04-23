import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinesspagePage } from './businesspage.page';

const routes: Routes = [
  {
    path: '',
    component: BusinesspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinesspagePageRoutingModule {}
