import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    ) { }

    handle(errorResponse: any) {
      let msg: string;

      if (typeof errorResponse === 'string') {
        msg = errorResponse;

      } else if (errorResponse instanceof HttpErrorResponse
          && errorResponse.status >= 400 && errorResponse.status <= 499) {

          if (errorResponse.status === 403) {
            msg = 'Você não tem permissão para executar essa ação';
          }
          let errors;
          msg = 'Ocorreu um erro ao processar a sua solicitação';

          try {
          errors = errorResponse.error;

          msg = errors[0].mensagemUsuario;
        } catch (e) { }

          console.error('Ocorreu um erro', errorResponse);

      } else {
        msg = 'Erro ao processar serviço remoto. Tente novamente.';
        console.error('Ocorreu um erro', errorResponse);
      }

      this.toasty.error(msg);
    }

  }
