import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule, ButtonModule } from 'primeng';
import { JwtModule, JwtHelperService  } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { MoneyHttpInterceptor } from './http-interceptor';
import { AuthGuard } from './auth.guard';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    HttpClientModule,
    JwtModule.forRoot({  config: {
        tokenGetter , // tokenGetter: tokenGetter,
        whitelistedDomains: [ 'localhost:8080' ],
        blacklistedRoutes: [ 'http://localhost:8080/oauth/token' ],

     } } ),
    SharedModule,
    SegurancaRoutingModule
  ],
  providers: [
    JwtHelperService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MoneyHttpInterceptor,
        multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
