import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavbusinessPage } from './favbusiness.page';

const routes: Routes = [
  {
    path: '',
    component: FavbusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavbusinessPageRoutingModule {}
