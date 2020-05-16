import { ConfirmDialogModule, TriStateCheckbox } from 'primeng';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  // lancamento = new Lancamento();

  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  codigoUrl: any ;

  editando = false;

  ngOnInit() {
    this.configurarFormulario();

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

  aoTerminarUploadAnexo(event){
    const anexo = event.originalEvent.body;
    console.log('Print que o arquivo terminou de ser upado. O objeto resposta é:');
    console.log(anexo);

    this.formulario.patchValue({
        anexo: anexo.nome,
        urlAnexo: anexo.url
    });
  }

  erroUpload(event){
    this.toastyService.error('Erro ao tentar enviar anexo');
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }
    return '';
  }

  //o get permite que usemos o nome da função no html como uma propriedade
  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
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
        console.log(resultado);
        this.categorias = resultado.map( c => ({ label: c.nome, value: c.codigo }) );
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarlancamento();
    }
  }


  adicionarlancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
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
        // this.lancamento = resultado;
        this.formulario.patchValue(resultado);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
    .then(  lancamentoAtualizado => {
      // this.lancamento = lancamentoAtualizado ;
      this.formulario.patchValue(lancamentoAtualizado);
      this.router.navigate(['/lancamentos', lancamentoAtualizado.codigo]);
      this.toastyService.success('Lançamento atualizado com sucesso!');

    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  novo() {
    this.formulario.reset();
    setTimeout( function() {
      this.lancamento = new Lancamento();
    }.bind(this),1);

    this.router.navigate(['/lancamentos/novo']);
  }

}
