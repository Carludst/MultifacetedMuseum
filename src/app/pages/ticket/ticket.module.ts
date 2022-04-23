import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketPageRoutingModule } from 'src/app/pages/ticket/ticket-routing.module';

import { TicketPage } from 'src/app/pages/ticket/ticket.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TicketPageRoutingModule,
        TranslateModule
    ],
  declarations: [TicketPage]
})
export class TicketsPageModule {}

