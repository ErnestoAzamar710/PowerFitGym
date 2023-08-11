import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrazoPage } from './brazo.page';

const routes: Routes = [
  {
    path: '',
    component: BrazoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrazoPageRoutingModule {}
