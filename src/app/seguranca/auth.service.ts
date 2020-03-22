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

    // withCredentials: true serve para o cookie não ser ignorado na API por conta do domínio de origem, CORS
    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
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
  obterNovoAccessToken(): Promise<void> {
    const body = 'grant_type=refresh_token';

    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true})
                .toPromise()
                .then(response => {
                  this.armazenarToken(response['access_token']);
                  console.log('Novo acess token a partir do refresh token');
                  return Promise.resolve(null);
                })
                .catch(error => {
                  console.error('Erro ao renovar token.', error);
                  return Promise.resolve(null);
                });

  }


  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

}
