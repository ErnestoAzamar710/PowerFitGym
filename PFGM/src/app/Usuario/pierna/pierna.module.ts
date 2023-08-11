import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiernaPageRoutingModule } from './pierna-routing.module';

import { PiernaPage } from './pierna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiernaPageRoutingModule
  ],
  declarations: [PiernaPage]
})
export class PiernaPageModule {}
