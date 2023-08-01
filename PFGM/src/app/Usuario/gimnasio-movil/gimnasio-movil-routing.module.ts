import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GimnasioMovilPage } from './gimnasio-movil.page';

const routes: Routes = [
  {
    path: '',
    component: GimnasioMovilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GimnasioMovilPageRoutingModule {}
