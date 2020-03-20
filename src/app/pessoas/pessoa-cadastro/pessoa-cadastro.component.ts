import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { Pessoa } from 'src/app/core/model';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {


    pessoa = new Pessoa();

    constructor(
      private pessoaService: PessoaService,
      private errorHandler: ErrorHandlerService,
      private toastyService: ToastyService
    ) { }

    ngOnInit() {
    }



    salvar(form: FormControl) {


      this.pessoaService.adicionar(this.pessoa)
      .then(  () => {
        this.toastyService.success('Lançamento adicionado com sucesso!');
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

  }
