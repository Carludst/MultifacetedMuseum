import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowListPageRoutingModule } from './show-list-routing.module';

import { ShowListPage } from './show-list.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShowListPageRoutingModule,
        TranslateModule
    ],
  declarations: [ShowListPage]
})
export class ShowListPageModule {}
