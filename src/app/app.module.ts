import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {ToastyModule} from 'ng2-toasty';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';


import { ConfirmationService } from 'primeng';
import { ConfirmDialogModule } from 'primeng';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,


    CoreModule,
    LancamentosModule,
    PessoasModule

  ],
  providers: [LancamentoService, PessoaService, ConfirmationService ],
  bootstrap: [AppComponent],
})
export class AppModule { }
