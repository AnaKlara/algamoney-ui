import { AuthGuard } from './../seguranca/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
  path: '' ,
  component: DashboardComponent,
  canActivate: [ AuthGuard ],
  data: { roles : ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  ];

/**
 * Módulo Dashboard Routing
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
