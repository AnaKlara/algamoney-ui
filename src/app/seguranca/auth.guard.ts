import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

// adicionar esse serviço como provider em segurança module

  constructor(
    private auth: AuthService,
    private router: Router,
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ( this.auth.isAccessTokenInvalido() ) {
      console.log('Navegação com access token inválido! Faça login para acessar esta página.');

      return this.auth.obterNovoAccessToken()
              .then( () => {
                if (!this.auth.isAccessTokenInvalido ){
                  this.router.navigate(['/login']);
                }
                return true;
              });
    } else if (next.data.roles && !this.auth.temQualquerPermissao(next.data.roles) ) {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
    return true;
  }
}
