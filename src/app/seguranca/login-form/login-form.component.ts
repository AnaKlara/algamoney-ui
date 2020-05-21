import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Algamoney Login');
  }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
    .then( () => {
      console.log("talvez tenha dado erro");
      this.router.navigate(['/dashboard']);
    })
    .catch(erro => {
      console.log("Talvez erro no login");
      this.errorHandler.handle(erro);
      this.router.navigate(['/login']);
    });
  }


}
