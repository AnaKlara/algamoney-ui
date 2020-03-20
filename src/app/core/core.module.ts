import { RouterModule } from '@angular/router';
import { CategoriaService } from './../categorias/categoria.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule, ConfirmationService } from 'primeng';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';


import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [ NavbarComponent ],
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
  ],
  providers: [
    ErrorHandlerService,

    LancamentoService,
    PessoaService,
    ConfirmationService,
    CategoriaService
  ]
})

export class CoreModule { }
