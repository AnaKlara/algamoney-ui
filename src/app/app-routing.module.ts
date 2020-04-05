import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

const routes: Routes = [
  // ajuda a implementar o lazy load
  {
    path: 'lancamentos',
    loadChildren: () => import('./lancamentos/lancamentos.module').then(m => m.LancamentosModule)
  },
  {
    path: 'pessoas',
    loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
  // ** significa qualquer path diferentes dos que foram mapeados
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
    // não é necessário mas é bom exportar o router module
  ]

})
export class AppRoutingModule { }
