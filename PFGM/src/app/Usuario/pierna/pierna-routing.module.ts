import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiernaPage } from './pierna.page';

const routes: Routes = [
  {
    path: '',
    component: PiernaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiernaPageRoutingModule {}
