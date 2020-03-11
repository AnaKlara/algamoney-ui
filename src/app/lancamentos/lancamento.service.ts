import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface LancamentoFilter {
  descricao: string;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamento';

  constructor(private http: HttpClient) { }


  pesquisar(filtro: LancamentoFilter): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                    // admin@algamoney.com:admin base64 encoded
    /* HttpParams é um componente imutável,
    o que significa que toda alteração feita em um objeto deste tipo,
    irá resultar em um outro objeto novo e não irá alterar a instância atual.
    Portanto, toda vez que chamarmos um método deste componente que deve alterar o seu estado,
    precisamos fazer uma nova atribuição... LET
    */
    let params = new HttpParams();
    // Precisamos atribuir o resultado do método "set" novamente à variável "params"

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers , params}) // {headers: headers, params:params}
      .toPromise()
      // tslint:disable-next-line: no-string-literal
      .then(response => response['content']);
  }

}
