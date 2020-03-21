import { PessoaService, PessoaFiltro  } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, Table, ConfirmationService } from 'primeng';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  // variáveis de instância
  pessoas = [  ];
  filtro = new PessoaFiltro();
  totalRegistros = 0;

  @ViewChild('tabela', {static: true}) grid: Table;


  // vamos injetar o serviço de busca por pessoas
constructor(
  private pessoaService: PessoaService,
  private toasty: ToastyService,
  private confirmation: ConfirmationService,
  private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit() {
      // this.pesquisar(); o evento Lazyload já dispara a chamada da função automaticamente
  }

  pesquisar(pagina = 0) {

  this.filtro.pagina = pagina;

  this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.totalElementos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  aoMudarPagina( event: LazyLoadEvent ) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }




  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que dezeja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }


  excluir(lancamento: any) {
    this.pessoaService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Pessoa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizaPropAtivo(codigo: number, pessoaStatus: boolean) {

    let setTo: boolean;
    if (pessoaStatus) {
      setTo = false;
    } else {
      setTo = true;
    }

    this.pessoaService.atualizaPropiedadeAtivo(codigo, setTo)
    .then(  () => {
      this.toasty.success(`Pessoa atualizada com sucesso!`);
      this.pesquisar(this.filtro.pagina);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
