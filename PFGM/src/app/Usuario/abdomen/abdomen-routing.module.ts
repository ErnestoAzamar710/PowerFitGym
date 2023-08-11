import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbdomenPage } from './abdomen.page';

const routes: Routes = [
  {
    path: '',
    component: AbdomenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbdomenPageRoutingModule {}
