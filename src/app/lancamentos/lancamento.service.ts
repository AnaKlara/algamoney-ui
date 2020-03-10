import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamento';

  constructor(private http: HttpClient) { }


  pesquisar(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                                              // admin@algamoney.com:admin base64 encoded

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers }) // headers: headers
      .toPromise()
      .then(response => response['content']);
  }

}
