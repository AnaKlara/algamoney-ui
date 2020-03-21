import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from '../seguranca/login-form/login-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    // não é necessário mas é bom exportar o router module
  ]

})

export class SegurancaRoutingModule { }



