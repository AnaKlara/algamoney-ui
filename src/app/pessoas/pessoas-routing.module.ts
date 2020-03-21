import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasPesquisaComponent } from '../pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from '../pessoas/pessoa-cadastro/pessoa-cadastro.component';


const routes: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/nova', component: PessoaCadastroComponent },
  { path: 'pessoas/:codigo', component: PessoaCadastroComponent },
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
