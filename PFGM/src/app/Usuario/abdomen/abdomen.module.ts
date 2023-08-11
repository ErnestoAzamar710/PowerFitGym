import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbdomenPageRoutingModule } from './abdomen-routing.module';

import { AbdomenPage } from './abdomen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbdomenPageRoutingModule
  ],
  declarations: [AbdomenPage]
})
export class AbdomenPageModule {}
