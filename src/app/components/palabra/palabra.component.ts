import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.sass']
})
export class PalabraComponent implements OnInit {
  public letras: string[] = [];
  @Input() palabra: string = '';
  @Input() cont!: number;
  @Input() turno!: number;
  @Input() letrasIngresadas: string[] = [];
  @Input() clasesLetras: string[] = [];
  @Input() showColors: boolean = false;  
  @Output() Nuevaletra = new EventEmitter<{ letra: string, indice: number, estado: string }>();

  ngOnInit(): void {
    this.letras = this.palabra.split('');
  }

  actualizarLetra(event: { letra: string, indice: number, estado: string }): void {
    this.Nuevaletra.emit(event);
  }
}