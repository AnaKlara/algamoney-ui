import { LancamentoService, LancamentoFiltro  } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

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

  /*
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  */



  // vamos injetar o serviço de busca por lançamentos
constructor(private lancamentoService: LancamentoService ) { }

ngOnInit() {
  this.pesquisar();
}

pesquisar() {

  this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.lancamentos = resultado.lancamentos;

    });
  }

}
