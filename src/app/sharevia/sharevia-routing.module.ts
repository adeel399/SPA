import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareviaPage } from './sharevia.page';

const routes: Routes = [
  {
    path: '',
    component: ShareviaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareviaPageRoutingModule {}
