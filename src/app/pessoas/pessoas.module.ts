import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext/inputtext';
import { ButtonModule } from 'primeng/button/button';
import { TableModule } from 'primeng/table/table';
import { TooltipModule } from 'primeng/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea/public_api';
import { CalendarModule } from 'primeng/calendar/calendar';
import { SelectButtonModule } from 'primeng/selectbutton/public_api';
import { DropdownModule } from 'primeng/dropdown/dropdown';
import { InputMaskModule } from 'primeng/inputmask/inputmask';

import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputMaskModule
  ]
})
export class PessoasModule { }
