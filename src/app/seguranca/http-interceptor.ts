import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export class NotAuthenticatedError {

}

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {

        if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {

        return from(this.auth.obterNovoAccessToken())
        .pipe(
            mergeMap(() => {
                if ( this.auth.isAccessTokenInvalido() ) {
                    throw new NotAuthenticatedError(); // se o acess token estiver expirado ele lança um erro
                }
                return next.handle(req);
                })
            );
        }

        return next.handle(req);
    }
}


/*
O que o método intercept faz?

Primeiramente fazemos duas validações, uma pra saber se não estamos nos referindo
ao path "/oauth/token" e outra para sabermos se o nosso token está inválido.

==> Se o path for /oauth/token
Neste caso, estamos fazendo uma busca por um token válido, o que significa que nosso token atual já foi invalidado.
Se não validarmos o request para este path, entraremos em um loop infinito.

==> Se o token está inválido
Aqui checamos se nosso token está inválido, e se estiver, precisamos obter um novo, através do "/oauth/token"

Se essas duas validações passarem, precisamos obter um novo access token antes de realizarmos a chamada ao nosso backend.

Utilizamos o operador "from" para que possamos transformar nossa Promise (retornada pelo método "obterNovoAccessToken") em um Observable,
 que é o tipo de retorno esperado pelo intercept.

Utilizamos o método "pipe" do Observable que irá nos ajudar a encadear outras operações neste mesmo Observable.

Dentro do método "pipe", usamos um outro operador chamadao "mergeMap", ele fará a "junção" dos dois Observable,
 o primeiro é o método "obterNovoAccessToken" e o segundo será o nosso retorno, que vem de "handle.next(req)"

Com isso, aguardamos o retorno do método "obterNovoAccessToken" e podemos adicionar o Header Authorization, obtendo-o do localStorage.
 E por fim, chamamos a requisição original.

Caso o token esteja válido ou se estivermos de fato fazendo uma requisição
para /oauth/token, apenas redirecionamos para a requisição original.

*/