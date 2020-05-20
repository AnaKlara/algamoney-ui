import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Pessoa, Estado, Cidade } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl : string; //  'http://localhost:8080/pessoas';
  estadosUrl : string;
  cidadesUrl : string;

  constructor(
    private http: MoneyHttp
    ) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    
    let params = new HttpParams();
    // Precisamos reatribuir o resultado do método "set" novamente à variável "params"
    params = params.set('page', filtro.pagina.toString() );
    params = params.set('size', filtro.itensPorPagina.toString() );


    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    return this.http.get(`${this.pessoasUrl}`, { params })
    .toPromise()
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
    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => {
        const pessoas = response['content'];
        return pessoas;
      });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}` )
          .toPromise()
          .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa ) 
      .toPromise();
  }


  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa ) 
      .toPromise()
      .then(response => {
        const pessoaAlterada = response as Pessoa;
        return pessoaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}` )
      .toPromise()
      .then();
  }

  atualizaPropiedadeAtivo(codigo: number , setTo: boolean) {
    console.log(setTo)
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${codigo}/ativo`, setTo )
      .toPromise()
      .then( status => {
        return status;
      });
  }


  // 24.3
  listarEstados(): Promise<Estado[]> {
    console.log(this.estadosUrl);
    return this.http.get(this.estadosUrl)
        .toPromise()
        .then(response => response as Estado[]);
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    let params = new HttpParams()
    params = params.set('estado', estado);
    return this.http.get(this.cidadesUrl, { params })
        .toPromise()
        .then(response => response as Cidade[]);
  }
}
