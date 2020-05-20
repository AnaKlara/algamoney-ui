import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

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
      private messageService: MessageService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
    ) { }

    codigoUrl: any ;
    
    estados : any[];
    cidades: any[];
    estadoSelecionado: number;

    ngOnInit() {

      const codigoPessoa  = this.route.snapshot.params['codigo'];

      this.title.setTitle('Nova pessoa');

      if (codigoPessoa) {
        this.buscarPessoaPorCodigo(codigoPessoa);
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
      }
    }

    adicionarPessoa(form: NgForm) {
      this.pessoaService.adicionar(this.pessoa)
      .then(  () => {
        const nome = this.pessoa.nome.split(' ').slice(0, 1).join(' ');
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
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
          this.title.setTitle('Adicionar pessoa');
        })
        .catch(erro => this.errorHandler.handle(erro));
    }


    atualizarPessoa(form: NgForm ) {
      this.pessoaService.atualizar(this.pessoa)
      .then(  pessoa => {
        this.pessoa = pessoa;
        const nome = this.pessoa.nome.split(' ').slice(0, 1).join(' ');
        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!' });
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

    get editando() {
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
