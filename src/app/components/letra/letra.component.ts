import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.sass']
})
export class LetraComponent {
  @Input() letra!: String
  public miLetra: String= '';
  @Input() palabra!: string
  opcion: string = ''
  css: string = ''

  verificar(){
    if(this.opcion === this.letra){
      this.css = 'acierto';
    }else if(this.opcion.trim() !== '' && this.palabra.includes(this.opcion)){
      this.css = 'present';
    } else if (this.opcion.trim() === ''){
      this.css = ''; //restablecer al estado de css cuando la opcion se borra
    } else {
      this.css='absent';
    }   
  }
}

