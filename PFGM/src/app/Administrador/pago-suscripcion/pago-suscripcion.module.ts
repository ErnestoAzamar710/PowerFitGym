import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoSuscripcionPageRoutingModule } from './pago-suscripcion-routing.module';

import { PagoSuscripcionPage } from './pago-suscripcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoSuscripcionPageRoutingModule
  ],
  declarations: [PagoSuscripcionPage]
})
export class PagoSuscripcionPageModule {}
