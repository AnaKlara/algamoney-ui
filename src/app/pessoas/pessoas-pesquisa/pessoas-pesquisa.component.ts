import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService, PessoaFiltro  } from './../pessoa.service';
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

  @ViewChild('tabela', { static: true }) grid;


  // vamos injetar o serviço de busca por pessoas
constructor(
  private pessoaService: PessoaService,
  private confirmation: ConfirmationService,
  private errorHandler: ErrorHandlerService,
  private messageService: MessageService,
  private title: Title,
    ) { }

  ngOnInit() {
      // this.pesquisar(); o evento Lazyload já dispara a chamada da função automaticamente
      this.title.setTitle('Pessoas');
  }

  pesquisar(pagina = 0) {

  this.filtro.pagina = pagina;

  this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      console.log(resultado);
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
        this.messageService.add({ severity: 'success', detail: 'Pesssoa excluída com sucesso!' });
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
      const acao = setTo ? 'ativada' : 'desativada';
      this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
      this.pesquisar(this.filtro.pagina);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
