import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algamoney-ui';

lancamentos = [
  {
    descricao: 'Salário mensal',
    dataVencimento: '09/06/2017',
    dataPagamento: null,
    valor: 6500.00,
    tipo: 'RECEITA',
    pessoa: 'João Silva',
  },
  {
      descricao: 'Bahamas',
      dataVencimento: '09/02/2017',
      dataPagamento: '09/02/2017',
      valor: 100.32,
      tipo: 'DESPESA',
      pessoa: 'Maria Rita',
  },
  {
      descricao: 'Top Club',
      dataVencimento: '09/06/2017',
      dataPagamento: null,
      valor: 120.00,
      tipo: 'RECEITA',
      pessoa: 'Pedro Santos',
  },
  {
      codigo: 4,
      descricao: 'CEMIG',
      dataVencimento: '09/02/2017',
      dataPagamento: '09/02/2017',
      valor: 110.44,
      tipo: 'DESPESA',
      pessoa: 'Ricardo Pereira',
      },
  {
      descricao: 'DMAE',
      dataVencimento: '09/06/2017',
      dataPagamento: null,
      valor: 200.30,
      tipo: 'DESPESA',
      pessoa:  'Josué Mariano',
  },
  {
      descricao: 'Extra',
      dataVencimento: '09/03/2017',
      dataPagamento: '09/03/2017',
      valor: 1010.32,
      tipo: 'RECEITA',
      pessoa: 'Pedro Barbosa',
  },
  {
      descricao: 'Bahamas',
      dataVencimento: '09/06/2017',
      dataPagamento: null,
      valor: 500.00,
      tipo: 'RECEITA',
      pessoa: 'Henrique Medeiros',
  },
  {
      descricao: 'Top Club',
      dataVencimento: '09/03/2017',
      dataPagamento: '09/03/2017',
      valor: 400.32,
      tipo: 'RECEITA',
      pessoa: 'Carlos Santana',
  }
];

}
