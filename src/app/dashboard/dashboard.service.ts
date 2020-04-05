import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: HttpClient  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response as Array<any> ) ;
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response as Array<any>;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
