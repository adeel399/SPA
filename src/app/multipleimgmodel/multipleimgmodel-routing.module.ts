import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleimgmodelPage } from './multipleimgmodel.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleimgmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleimgmodelPageRoutingModule {}
