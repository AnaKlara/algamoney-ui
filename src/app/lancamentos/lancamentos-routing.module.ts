import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentosPesquisaComponent } from '../lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from '../lancamentos/lancamento-cadastro/lancamento-cadastro.component';


const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    //configuração de rotas num módulo não raíz chamamos o for Child
  ],
  exports: [
    RouterModule,
    // não é necessário mas é bom exportar o router module
  ]

})
export class LancamentosRoutingModule { }
