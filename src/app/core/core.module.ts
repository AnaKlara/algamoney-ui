import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmationService, MessageService } from 'primeng';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

import { AuthService } from './../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatoriosService } from '../relatorios/relatorios.service';
import { MoneyHttp } from '../seguranca/money-http';



registerLocaleData(localePt);

@NgModule({
  declarations: [
     NavbarComponent, 
     PaginaNaoEncontradaComponent, 
     NaoAutorizadoComponent 
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    DashboardService,
    RelatoriosService,
    ErrorHandlerService,
    AuthService,
    MoneyHttp,

    ConfirmationService,
    MessageService,
    JwtHelperService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})

export class CoreModule { }
