import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
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

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }


    return this.http.get(`${this.pessoasUrl}`, { headers , params}) // {headers: headers, params:params}
      .toPromise()
      // tslint:disable-next-line: no-string-literal
      .then(response => {
        const pessoas = response['content'];
        const resultado = {
          pessoas, // lancamentos : lancamentos
          totalElementos : response['totalElements']
        }
        return resultado;
      });
  }





  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                    // admin@algamoney.com:admin base64 encoded
    /* HttpParams é um componente imutável,
    o que significa que toda alteração feita em um objeto deste tipo,
    irá resultar em um outro objeto novo e não irá alterar a instância atual.
    Portanto, toda vez que chamarmos um método deste componente que deve alterar o seu estado,
    precisamos fazer uma nova atribuição... LET
    */

    return this.http.get(`${this.pessoasUrl}`, { headers })
      .toPromise()
      .then(response => {
        const pessoas = response['content'];
        return pessoas;
      });
  }

}
