import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { Lancamento } from 'src/app/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

// tipos -> variável de instância
  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [  ];

  pessoas = [];

  lancamento = new Lancamento();
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) { }

  codigoUrl: any ;

  editando = false;

  ngOnInit() {

    this.codigoUrl = this.route.snapshot.params['codigo'];
    this.urlComCodigo(this.codigoUrl);


    this.carregarPessoas();
    this.carregarCategorias();

    if (this.editando) {
      this.title.setTitle('Edição de Laçamento');
    } else {
      this.title.setTitle('Novo Laçamento');
    }

  }

  urlComCodigo(codigoUrl: any) {
    console.log('Printando o codigo da URL: ');
    console.log(codigoUrl);

    if ( typeof codigoUrl === 'undefined' ) {
      console.log('Um novo lançamento');
    } else {
      console.log('Atualizando lançamento');
      this.buscarLancamentoPorCodigo(codigoUrl);
      this.editando = true;
    }
  }

  carregarPessoas() {

    this.pessoaService.listarTodas()
      .then(resultado => {
        this.pessoas = resultado.map( c => ({ label: c.nome, value: c.codigo }) );
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  carregarCategorias() {
    this.categoriaService.listarCategorias()
      .then(resultado => {
        this.categorias = resultado.map( c => ({ label: c.nome, value: c.codigo }) );
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
/*
O modelo dos dados do drop dawn do prime ng é assim:
[
  {label: 'Audi', value: 'Audi'},
  {label: 'BMW', value: 'BMW'},
  {label: 'Mercedes', value: 'Mercedes'}
]
 e quando recebemos os dados da API receebemos assim:

 [
    {"codigo": 1,"nome": "lazer" },
    {"codigo": 2,"nome": "Alimentação"},
    {"codigo": 3,"nome": "Supermercado"},
    {"codigo": 4,"nome": "Farmácia"},
    {"codigo": 5,"nome": "Outros" }
]
Então usamos a função map() para iterar em cada item da resposta da API
e transformar em um objeto compatível com o primeNG

*/
  salvar(form: NgForm ) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarlancamento(form);
    }
  }

  adicionarlancamento(form: NgForm) {

    this.lancamentoService.adicionar(this.lancamento)
    .then(  lancamentoAdicionado => {
      this.toastyService.success('Novo lançamento cadastrado com sucesso!');
      // form.reset();
      // this.lancamento = new Lancamento();
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  buscarLancamentoPorCodigo(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(resultado => {
        this.lancamento = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarLancamento(form: NgForm) {

    this.lancamentoService.atualizar(this.lancamento)
    .then(  lancamentoAtualizado => {
      // this.lancamento = lancamentoAtualizado ;

      setTimeout( function() {
        this.router.navigate(['/lancamentos', lancamentoAtualizado.codigo]);
        this.toastyService.success('Lançamento atualizado com sucesso!');
      }.bind(this),1);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout( function() {
      this.lancamento = new Lancamento();
    }.bind(this),1);

    this.router.navigate(['/lancamentos/novo']);
  }

}
