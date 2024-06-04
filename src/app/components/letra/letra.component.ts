//letra.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.sass']
})
export class LetraComponent implements OnInit {
  @Input() letra: string = '';
  @Input() palabra: string = '';
  @Input() turnoActual: number = 0;
  @Input() indice: number = 0;
  @Input() estadoInicial: string = '';
  @Input() showColors: boolean = false;  // New input to control color display
  @Output() Nuevaletra = new EventEmitter<{ letra: string, indice: number, estado: string }>();

  public miletra: string = '';
  public sass: string = '';

  ngOnInit(): void {
    this.miletra = '';
    this.sass = this.estadoInicial; 
  }

  verificar(): void {
    if (this.miletra.trim() === '') {
      this.sass = ''; 
    } else if (this.miletra === this.letra) {
      this.sass = 'acierto';
    } else if (this.palabra.includes(this.miletra)) {
      this.sass = 'present';
    } else {
      this.sass = 'absent';
    }
    this.Nuevaletra.emit({ letra: this.miletra, indice: this.indice, estado: this.sass });
  }
}