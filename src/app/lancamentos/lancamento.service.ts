import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamento';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                    // admin@algamoney.com:admin base64 encoded
    /* HttpParams é um componente imutável,
    o que significa que toda alteração feita em um objeto deste tipo,
    irá resultar em um outro objeto novo e não irá alterar a instância atual.
    Portanto, toda vez que chamarmos um método deste componente que deve alterar o seu estado,
    precisamos fazer uma nova atribuição... LET
    */
    let params = new HttpParams();
    // Precisamos reatribuir o resultado do método "set" novamente à variável "params"

    params = params.set('page', filtro.pagina.toString() );
    params = params.set('size', filtro.itensPorPagina.toString() );

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
        params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers , params}) // {headers: headers, params:params}
      .toPromise()
      // tslint:disable-next-line: no-string-literal
      .then(response => {
        const lancamentos = response['content'];
        const resultado = {
          lancamentos, // lancamentos : lancamentos
          totalElementos : response['totalElements']
        }
        return resultado;
      });
  }


  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // admin@algamoney.com:admin base64 encoded

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
          .toPromise()
          .then(() => null);
  }

}
