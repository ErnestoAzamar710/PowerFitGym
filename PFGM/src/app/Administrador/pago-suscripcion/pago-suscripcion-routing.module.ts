import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoSuscripcionPage } from './pago-suscripcion.page';

const routes: Routes = [
  {
    path: '',
    component: PagoSuscripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoSuscripcionPageRoutingModule {}
