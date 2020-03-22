import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from '../core/model';

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


    // return this.http.get(`${this.pessoasUrl}`, { headers , params}) // {headers: headers, params:params}
    return this.http.get(`${this.pessoasUrl}`, { params })
    .toPromise()
      // tslint:disable-next-line: no-string-literal
      .then(response => {
        const pessoas = response['content'];
        const resultado = {
          pessoas, // lancamentos : lancamentos
          totalElementos : response['totalElements']
        }
        return resultado;
      }
    );
  }





  listarTodas(): Promise<any> {
   //  const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                    // admin@algamoney.com:admin base64 encoded
    /* HttpParams é um componente imutável,
    o que significa que toda alteração feita em um objeto deste tipo,
    irá resultar em um outro objeto novo e não irá alterar a instância atual.
    Portanto, toda vez que chamarmos um método deste componente que deve alterar o seu estado,
    precisamos fazer uma nova atribuição... LET
    */

    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => {
        const pessoas = response['content'];
        return pessoas;
      });
  }


  excluir(codigo: number): Promise<void> {

    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // admin@algamoney.com:admin base64 encoded

    return this.http.delete(`${this.pessoasUrl}/${codigo}` ) // , { headers })
          .toPromise()
          .then(() => null);
  }


  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    console.log(Pessoa);
    /*
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    // admin@algamoney.com:admin base64 encoded
    .append('Content-Type', 'application/json');
    */
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa ) // , { headers })
      .toPromise();
  }


  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    /*
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    // admin@algamoney.com:admin base64 encoded
    .append('Content-Type', 'application/json');
    */
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa ) // , { headers })
      .toPromise()
      .then(response => {
        const pessoaAlterada = response as Pessoa;
        return pessoaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                    // admin@algamoney.com:admin base64 encoded
    return this.http.get(`${this.pessoasUrl}/${codigo}` ) // , { headers }) // {headers: headers, params:params}
      .toPromise()
      .then();
  }

  atualizaPropiedadeAtivo(codigo: number , setTo: boolean) {
    /*
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    // admin@algamoney.com:admin base64 encoded
    .append('Content-Type', 'application/json');
    */
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${codigo}/ativo`, setTo ) // , { headers })
      .toPromise()
      .then( status => {
        return status;
      });
  }
}
