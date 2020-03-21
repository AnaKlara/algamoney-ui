import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule, ButtonModule } from 'primeng';
import { JwtHelperService, JwtModule  } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { SegurancaRoutingModule } from './seguranca-routing.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
  }),
    SharedModule,
    SegurancaRoutingModule
  ],
  providers: [
    JwtHelperService
  ]
})
export class SegurancaModule { }
