import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// é uma boa prática importar explicitamente o to promise
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarCategorias(): Promise<any> {
    return this.http.get(this.categoriasUrl)
      .toPromise();
  }

}