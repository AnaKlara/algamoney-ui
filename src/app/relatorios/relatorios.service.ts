import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string; // 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient,
    ) {
      this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
     }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {

  //Para declarar os parâmetros
  let params = new HttpParams();

  params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
  params = params.set('fim', moment(fim).format('YYYY-MM-DD'));

  //Para a requisição
  return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise()
      .then(response => response);
  }
}
