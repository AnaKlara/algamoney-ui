import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CoreModule,
    // LancamentosModule, foi retirado na implementação do lazy load
    // PessoasModule, foi retirado na implementação do lazy load
    SegurancaModule,
    AppRoutingModule

  ],
  providers: [

     ],

  bootstrap: [AppComponent],
})
export class AppModule { }
