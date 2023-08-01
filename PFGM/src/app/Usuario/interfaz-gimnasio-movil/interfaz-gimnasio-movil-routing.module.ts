import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterfazGimnasioMovilPage } from './interfaz-gimnasio-movil.page';

const routes: Routes = [
  {
    path: '',
    component: InterfazGimnasioMovilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterfazGimnasioMovilPageRoutingModule {}
