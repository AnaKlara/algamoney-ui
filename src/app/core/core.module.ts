import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule, ConfirmationService } from 'primeng';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';


registerLocaleData(localePt);


/*
PQ não precisamos exportar o componente PaginaNaoEncontradaComponent
*/

@NgModule({
  declarations: [ NavbarComponent, PaginaNaoEncontradaComponent ],
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
