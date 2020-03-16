import { PessoaService, PessoaFiltro  } from './../pessoa.service';
import { Component } from '@angular/core';

import { LazyLoadEvent } from 'primeng/primeng';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  // variáveis de instância
  pessoas = [  ];
  filtro = new PessoaFiltro();
  totalRegistros = 0;


  // vamos injetar o serviço de busca por pessoas
constructor(private pessoaService: PessoaService ) { }


pesquisar(pagina = 0) {

  this.filtro.pagina = pagina;

  this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.totalElementos;
    });
  }



  aoMudarPagina( event: LazyLoadEvent ) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
