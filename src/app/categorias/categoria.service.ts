import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// é uma boa prática importar explicitamente o to promise
import 'rxjs';

@Injectable()
export class CategoriaService {


  categoriasUrl: string;

  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }


  listarCategorias(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
                                    // admin@algamoney.com:admin base64 encoded
    return this.http.get(`${this.categoriasUrl}`, { headers })
      .toPromise()
      .then(response => response );
  }


}
