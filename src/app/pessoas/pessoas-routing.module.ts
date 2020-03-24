import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasPesquisaComponent } from '../pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from '../pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    path: 'nova',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  {
    path: ':codigo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
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
export class PessoasRoutingModule { }
