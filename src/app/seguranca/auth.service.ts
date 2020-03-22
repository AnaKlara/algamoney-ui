import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
                          .append('Content-Type', 'application/x-www-form-urlencoded')
                          .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers })
    .toPromise()
    .then( response => {
      console.log(response);
      this.armazenarToken(response.access_token);
    })
    .catch(response => {
      const responseError = response.error;
      if (response.status === 400) {
        if (responseError.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida');
        }
      }
      return Promise.reject(response); // quando dá ruim mas não sabemos oq é
    });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
