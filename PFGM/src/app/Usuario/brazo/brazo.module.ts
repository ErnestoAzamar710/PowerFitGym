import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrazoPageRoutingModule } from './brazo-routing.module';

import { BrazoPage } from './brazo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrazoPageRoutingModule
  ],
  declarations: [BrazoPage]
})
export class BrazoPageModule {}
