import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharecodePage } from './sharecode.page';

const routes: Routes = [
  {
    path: '',
    component: SharecodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharecodePageRoutingModule {}
