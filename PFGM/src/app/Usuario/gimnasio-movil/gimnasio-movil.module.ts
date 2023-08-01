import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GimnasioMovilPageRoutingModule } from './gimnasio-movil-routing.module';

import { GimnasioMovilPage } from './gimnasio-movil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GimnasioMovilPageRoutingModule
  ],
  declarations: [GimnasioMovilPage]
})
export class GimnasioMovilPageModule {}
