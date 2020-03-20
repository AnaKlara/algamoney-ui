import { LancamentoService, LancamentoFiltro  } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, Table } from 'primeng/primeng';
import {ConfirmationService } from 'primeng';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  // variáveis de instância
  lancamentos = [  ];
  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  // a propriedade static diz ao Angular em que momento as mudanças
  // deverão ser detectadas.
  @ViewChild('tabela', {static: true}) grid: Table;

  /*
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  */



  // vamos injetar o serviço de busca por lançamentos
  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    // this.pesquisar(); o evento Lazyload já dispara a chamada da função automaticamente
  }



  pesquisar(pagina = 0) {

  this.filtro.pagina = pagina;

  this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.lancamentos = resultado.lancamentos;
      this.totalRegistros = resultado.totalElementos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  aoMudarPagina( event: LazyLoadEvent ) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que dezeja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }


  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Lançamento excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
