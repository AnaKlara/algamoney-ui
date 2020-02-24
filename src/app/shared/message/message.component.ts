import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

// 13.9
@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="temErro()" class="ui-messages ui-messages-error">
  {{ text }}
</div>
  `,
  styles: [`
  .ui-messages-error {
    margin: 0;
    margin-top: 4px;
  }
`]
})
export class MessageComponent {

  /*
@input é um decorator que trata da comunicação de um componente pai comum componente filho
Entrada para disponibilizar a variável de instância a seguir para os componentes-pai
para transmitir dados.
  */
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
