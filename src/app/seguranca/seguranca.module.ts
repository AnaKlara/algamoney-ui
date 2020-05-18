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
import { environment } from '../../environments/environment';

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
        whitelistedDomains: environment.whitelistedDomains,//lista de dominios que o token será enviado (não pode ser enviado para qualquer lugar)
        blacklistedRoutes: environment.blacklistedRoutes

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
