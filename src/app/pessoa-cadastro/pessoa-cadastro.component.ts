import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  CEP: string;
  cidade: string;
  estado: string;
}

class Pessoa {
nome: string;
endereco: Endereco;
}

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

pessoa = new Pessoa();

  salvar(form:NgForm) {
    console.log(form);
    form.reset();
  }

}
