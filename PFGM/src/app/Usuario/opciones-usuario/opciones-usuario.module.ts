import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesUsuarioPageRoutingModule } from './opciones-usuario-routing.module';

import { OpcionesUsuarioPage } from './opciones-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesUsuarioPageRoutingModule
  ],
  declarations: [OpcionesUsuarioPage]
})
export class OpcionesUsuarioPageModule {}
