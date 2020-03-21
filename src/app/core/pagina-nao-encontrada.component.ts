import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
  <div class=" pgNotFounded" >
    <h1 class="msg" >
      Página não encontrada...
    </h1>
  </div>
  `,
  styles: [
    '.msg {font-weight: bold;}',
    '.pgNotFounded {margin: auto;}',
    '.pgNotFounded {width:40%;}',
    '.pgNotFounded {padding:10%;}',

  ]
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
