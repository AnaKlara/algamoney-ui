import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { Lancamento } from 'src/app/core/model';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
    private route: ActivatedRoute
  ) { }

  codigoUrl: any ;

  editando = false;

  ngOnInit() {

    this.codigoUrl = this.route.snapshot.params['codigo'];
    this.urlComCodigo(this.codigoUrl);


    this.carregarPessoas();
    this.carregarCategorias();
  }

  urlComCodigo(codigoUrl: any) {
    console.log('Printando o codigo da URL: ');
    console.log(codigoUrl);

    if ( codigoUrl === 'Novo' ) {
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
  salvar(form: FormControl) {
    if (this.editando) {
      console.log(this.lancamento.dataPagamento);
      this.atualizarLancamento(form);
    } else {
      console.log( typeof(this.lancamento.dataPagamento));
      this.adicionarlancamento(form);
    }
  }



  adicionarlancamento(form: FormControl) {

    this.lancamentoService.adicionar(this.lancamento)
    .then(  () => {
      this.toastyService.success('Novo lançamento cadastrado com sucesso!');
      form.reset();
      this.lancamento = new Lancamento();
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


  atualizarLancamento(form: FormControl) {

    this.lancamentoService.atualizar(this.lancamento)
    .then(  lancamento => {
      this.lancamento = lancamento;
      this.toastyService.success('Lançamento atualizado com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


}
