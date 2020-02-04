import { Component} from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

pessoas = [
  {
      codigo: 1,
      nome: 'João Silva',
      endereco: {
          logradouro: 'Rua do Abacaxi',
          numero: 10,
          complemento: null,
          bairro: 'Brasil',
          cep: '38.400-12',
          cidade: 'Uberlândia',
          estado: 'MG'
      },
      ativo: true
  },
  {
      codigo: 2,
      nome: 'Maria Rita',
      endereco: {
          logradouro: 'Rua do Sabiá',
          numero: 110,
          complemento: 'Apto 101',
          bairro: 'Colina',
          cep: '11.400-12',
          cidade: 'Ribeirão Preto',
          estado: 'SP'
      },
      ativo: true
  },
  {
      codigo: 3,
      nome: 'Pedro Santos',
      endereco: {
          logradouro: 'Rua da Bateria',
          numero: 23,
          complemento: null,
          bairro: 'Morumbi',
          cep: '54.212-12',
          cidade: 'Goiânia',
          estado: 'GO'
      },
      ativo: false
  },
  {
      codigo: 4,
      nome: 'Ricardo Pereira',
      endereco: {
          logradouro: 'Rua do Motorista',
          numero: 123,
          complemento: 'Apto 302',
          bairro: 'Aparecida',
          cep: '38.400-12',
          cidade: 'Salvador',
          estado: 'BA'
      },
      ativo: true
  },
  {
      codigo: 5,
      nome: 'Josué Mariano',
      endereco: {
          logradouro: 'Av Rio Branco',
          numero: 321,
          complemento: null,
          bairro: 'Jardins',
          cep: '56.400-12',
          cidade: 'Natal',
          estado: 'RN'
      },
      ativo: true
  },
  {
      codigo: 6,
      nome: 'Pedro Barbosa',
      endereco: {
          logradouro: 'Av Brasil',
          numero: 100,
          complemento: null,
          bairro: 'Tubalina',
          cep: '77.400-12',
          cidade: 'Porto Alegre',
          estado: 'RS'
      },
      ativo: true
  },
  {
      codigo: 7,
      nome: 'Henrique Medeiros',
      endereco: {
          logradouro: 'Rua do Sapo',
          numero: 1120,
          complemento: 'Apto 201',
          bairro: 'Centro',
          cep: '12.400-12',
          cidade: 'Rio de Janeiro',
          estado: 'RJ'
      },
      ativo: true
  },
  {
      codigo: 8,
      nome: 'Carlos Santana',
      endereco: {
          logradouro: 'Rua da Manga',
          numero: 433,
          complemento: null,
          bairro: 'Centro',
          cep: '31.400-12',
          cidade: 'Belo Horizonte',
          estado: 'MG'
      },
      ativo: true
  },
  {
      codigo: 9,
      nome: 'Leonardo Oliveira',
      endereco: {
          logradouro: 'Rua do Músico',
          numero: 566,
          complemento: null,
          bairro: 'Segismundo Pereira',
          cep: '38.400-00',
          cidade: 'Uberlândia',
          estado: 'MG'
      },
      ativo: true
  },
  {
      codigo: 10,
      nome: 'Isabela Martins',
      endereco: {
          logradouro: 'Rua da Terra',
          numero: 1233,
          complemento: 'Apto 10',
          bairro: 'Vigilato',
          cep: '99.400-12',
          cidade: 'Manaus',
          estado: 'AM'
      },
      ativo: true
  }
];
}
