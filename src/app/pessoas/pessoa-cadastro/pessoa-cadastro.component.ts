import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
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
      private toastyService: ToastyService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
    ) { }

    codigoUrl: any ;
    editando = false;
    
    estados : any[];
    cidades: any[];
    estadoSelecionado: number;

    ngOnInit() {

      this.codigoUrl = this.route.snapshot.params['codigo'];

      this.urlComCodigo(this.codigoUrl);

      if (this.editando) {
        this.title.setTitle('Edição de Pessoa');
      } else {
        this.title.setTitle('Adicionar Pessoa');
      }
      this.carregarEstados();

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

    adicionarPessoa(form: NgForm) {
      this.pessoaService.adicionar(this.pessoa)
      .then(  () => {
        const nome = this.pessoa.nome.split(' ').slice(0, 1).join(' ');
        this.toastyService.success(`${nome} adicionado(a) com sucesso!`);
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
    }



    salvar(form: NgForm) {
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
          this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
                                  this.pessoa.endereco.cidade.estado.codigo: null;
          if (this.estadoSelecionado){
            this.carregarCidades();
          }
        })
        .catch(erro => this.errorHandler.handle(erro));
    }


    atualizarPessoa(form: NgForm ) {
      this.pessoaService.atualizar(this.pessoa)
      .then(  pessoa => {
        this.pessoa = pessoa;
        const nome = this.pessoa.nome.split(' ').slice(0, 1).join(' ');
        this.toastyService.success(`${nome} atualizado(a) com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    nova(form: NgForm) {
      form.reset();
      setTimeout( function() {
        this.pessoa = new Pessoa();
      }.bind(this), 1);

      this.router.navigate(['/pessoas/nova']);
    }

    get editandoCadastro() {
      return Boolean(this.pessoa.codigo);
    }

    carregarEstados() {
      this.pessoaService.listarEstados().then(lista => {
        this.estados = lista.map(uf => ({ label: uf.nome, value:uf.codigo}) );
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    carregarCidades() {
      this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
        this.cidades = lista.map(cidade => ({ label: cidade.nome, value:cidade.codigo}) );
      })
      .catch(erro => this.errorHandler.handle(erro));
    }
  }
