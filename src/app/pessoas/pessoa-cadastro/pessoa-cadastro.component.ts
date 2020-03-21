import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { Pessoa } from 'src/app/core/model';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


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
      private toastyService: ToastyService,
      private route: ActivatedRoute,
      private title: Title
    ) { }

    codigoUrl: any ;

    editando = false;

    ngOnInit() {

      this.codigoUrl = this.route.snapshot.params['codigo'];
      this.urlComCodigo(this.codigoUrl);

      if (this.editando) {
        this.title.setTitle('Edição de Pessoa');
      } else {
        this.title.setTitle('Adicionar Pessoa');
      }

    }


    urlComCodigo(codigoUrl: any) {
      console.log('Printando o codigo da URL: ');
      console.log(codigoUrl);

      if ( typeof codigoUrl === 'undefined' ) {
        console.log('Adicionando uma nova pessoa...');
      } else {
        console.log('Atualizando pessoa');
        this.buscarPessoaPorCodigo(codigoUrl);
        this.editando = true;
      }
    }

    adicionarPessoa(form: FormControl) {

      this.pessoaService.adicionar(this.pessoa)
      .then(  () => {
        const nome = this.pessoa.nome.split(' ').slice(0, 1).join(' ');
        this.toastyService.success(`${nome} adicionado(a) com sucesso!`);
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
    }



    salvar(form: FormControl) {
      if (this.editando) {
        this.atualizarPessoa(form);
      } else {
        this.adicionarPessoa(form);
      }
    }


    buscarPessoaPorCodigo(codigo: number) {
      this.pessoaService.buscarPorCodigo(codigo)
        .then(resultado => {
          this.pessoa = resultado;
        })
        .catch(erro => this.errorHandler.handle(erro));
    }


    atualizarPessoa(form: FormControl ) {

      this.pessoaService.atualizar(this.pessoa)
      .then(  pessoa => {
        this.pessoa = pessoa;
        const nome = this.pessoa.nome.split(' ').slice(0, 1).join(' ');
        this.toastyService.success(`${nome} atualizado(a) com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
    }




  }
