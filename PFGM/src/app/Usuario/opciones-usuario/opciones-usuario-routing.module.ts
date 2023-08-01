import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesUsuarioPage } from './opciones-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesUsuarioPageRoutingModule {}
