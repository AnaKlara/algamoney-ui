export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
}

export class Categoria {
  codigo: number;
}


export class Lancamento {

  codigo: number;
  tipo = 'RECEITA'; // string
  descricao: string;
  dataVencimento: string;
  dataPagamento: string;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}