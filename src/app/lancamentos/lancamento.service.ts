import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string; // 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient,
    ) {
      this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
     }

  urlUploadAnexo(): string {
    //console.log(`${this.lancamentosUrl}/anexo`);
    return `${this.lancamentosUrl}/anexo`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    /*
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                    // admin@algamoney.com:admin base64 encoded
    HttpParams é um componente imutável,
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

    // return this.http.get(`${this.lancamentosUrl}?resumo`, { headers , params})
    // {headers: headers, params:params}
    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
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

    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // admin@algamoney.com:admin base64 encoded

    return this.http.delete(`${this.lancamentosUrl}/${codigo}` ) // , { headers })
          .toPromise()
          .then(() => null);
  }


  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    this.converterStringsParaDatas([lancamento]);
    console.log(lancamento);
    /*
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    // admin@algamoney.com:admin base64 encoded
    .append('Content-Type', 'application/json');
    */
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento ) // , { headers })
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    this.converterStringsParaDatas([lancamento]);
    /*
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    // admin@algamoney.com:admin base64 encoded
    .append('Content-Type', 'application/json');
    */
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento ) //, { headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response as Lancamento;
        // this.converterStringsParaDatas([lancamentoAlterado]);
        console.log('Lançamento atualizado com sucesso! No banco temos o seguinte:');
        console.log(lancamentoAlterado);
        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                    // admin@algamoney.com:admin base64 encoded
    return this.http.get(`${this.lancamentosUrl}/${codigo}` ) // , { headers }) // {headers: headers, params:params}
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;
        // this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {

    for (const lancamento of lancamentos) {
      if (lancamento.dataVencimento && typeof lancamento.dataVencimento !== 'string') {
        console.log('Printando a data de vencimento antes');
        console.log(lancamento.dataVencimento);
        console.log(typeof lancamento.dataVencimento);

        lancamento.dataVencimento = moment(lancamento.dataVencimento).format('DD/MM/YYYY').toString();

        console.log('Printando a data de vencimento depois');
        console.log(lancamento.dataVencimento);
        console.log(typeof lancamento.dataVencimento);
      }
      if (lancamento.dataPagamento && typeof lancamento.dataPagamento !== 'string') {
        lancamento.dataPagamento = moment(lancamento.dataPagamento).format('DD/MM/YYYY').toString();
      }
    }
  }




}
