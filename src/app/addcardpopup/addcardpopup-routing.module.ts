import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcardpopupPage } from './addcardpopup.page';

const routes: Routes = [
  {
    path: '',
    component: AddcardpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcardpopupPageRoutingModule {}
