import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatepopupPage } from './createpopup.page';

const routes: Routes = [
  {
    path: '',
    component: CreatepopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatepopupPageRoutingModule {}
