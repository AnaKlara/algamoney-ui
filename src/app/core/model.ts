/**
 * Classe que representa uma entidade Endereço
 *
 * @class
 */
export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}

/**
 * Classe que representa uma entidade Pessoa
 *
 * @class
 */
export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
  contatos = new Array<Contato>();
}
/**
 * Classe que representa uma entidade Categoria
 *
 * @class
 */
export class Categoria {
  codigo: number;
}

/**
 * Classe que representa uma entidade Lancamento
 *
 * @class
 */
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
  anexo: String;
  urlAnexo: string ;
}

/**
 * Classe que representa uma entidade Contato
 *
 * @class
 */
export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number,
    nome?: string,
    email?: string,
    telefone?: string) {
      this.codigo = codigo;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
  }
}

/**
 * Classe que representa uma entidade Estado
 *
 * @class
 */
export class Estado { 
  codigo: number;
  nome: string;
}

/**
 * Classe que representa uma entidade Cidade
 *
 * @class
 */
export class Cidade { 
  codigo: number;
  nome: string;
  estado = new Estado();
}