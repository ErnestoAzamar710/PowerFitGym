import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterfazGimnasioMovilPageRoutingModule } from './interfaz-gimnasio-movil-routing.module';

import { InterfazGimnasioMovilPage } from './interfaz-gimnasio-movil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterfazGimnasioMovilPageRoutingModule
  ],
  declarations: [InterfazGimnasioMovilPage]
})
export class InterfazGimnasioMovilPageModule {}
