import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';


@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    SharedModule
  ]
})
export class RelatoriosModule { }
