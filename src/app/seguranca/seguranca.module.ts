import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';


import { SharedModule } from '../shared/shared.module';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule, ButtonModule } from 'primeng';


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SharedModule,
    SegurancaRoutingModule
  ]
})
export class SegurancaModule { }
