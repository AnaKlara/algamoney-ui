export class Pessoa {
  codigo: number;

}

export class Categoria {
  codigo: number;
}


export class Lancamento {

  codigo: number;
  tipo: string = 'RECEITA';
  descricao: string;
  dataVencimento: string;
  dataPagamento: string;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
