import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string; // 'http://localhost:8080/lancamentos';

  constructor(
    private http: MoneyHttp,
    ) {
      this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
     }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new HttpParams()
      .append('inicio', moment(inicio).format('YYYY-MM-DD'))
      .append('fim', moment(fim).format('YYYY-MM-DD'));

  //Para a requisição
  return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
  }
}
