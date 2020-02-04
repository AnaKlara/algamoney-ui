import { Component} from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    {
      descricao: 'Salário mensal',
      dataVencimento: new Date(2020, 1, 9),
      dataPagamento:  new Date(2020, 1, 22) ,
      valor: 6500.00,
      tipo: 'RECEITA',
      pessoa: 'João Silva',
    },
    {
        descricao: 'Bahamas',
        dataVencimento: new Date(2020, 1, 15) ,
        dataPagamento: new Date(2020, 1, 17) ,
        valor: 100.32,
        tipo: 'DESPESA',
        pessoa: 'Maria Rita',
    },
    {
        descricao: 'Top Club',
        dataVencimento: new Date(2020, 1, 1) ,
        dataPagamento: null,
        valor: 120.00,
        tipo: 'RECEITA',
        pessoa: 'Pedro Santos',
    },
    {
        codigo: 4,
        descricao: 'CEMIG',
        dataVencimento: new Date(2020, 1, 3) ,
        dataPagamento: new Date(2020, 1, 31) ,
        valor: 110.44,
        tipo: 'DESPESA',
        pessoa: 'Ricardo Pereira',
        },
    {
        descricao: 'DMAE',
        dataVencimento: new Date(2020, 1, 23) ,
        dataPagamento: new Date(2020, 1, 26) ,
        valor: 200.30,
        tipo: 'DESPESA',
        pessoa:  'Josué Mariano',
    },
    {
        descricao: 'Extra',
        dataVencimento: new Date(2020, 1, 27) ,
        dataPagamento: new Date(2020, 1, 31) ,
        valor: 1010.32,
        tipo: 'RECEITA',
        pessoa: 'Pedro Barbosa',
    },
    {
        descricao: 'Bahamas',
        dataVencimento: new Date(2020, 1, 22) ,
        dataPagamento: null,
        valor: 500.00,
        tipo: 'RECEITA',
        pessoa: 'Henrique Medeiros',
    },
    {
        descricao: 'Top Club',
        dataVencimento: new Date(2020, 1, 10) ,
        dataPagamento: new Date(2020, 1, 15) ,
        valor: 400.32,
        tipo: 'RECEITA',
        pessoa: 'Carlos Santana',
    }
  ];

}
