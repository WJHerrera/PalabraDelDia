import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.sass']
})
export class PalabraComponent implements OnInit {
  @Input() palabra: string = '';
  @Input() cont!: number;
  @Input() turno!: number;
  @Output() wordGuessed: EventEmitter<void> = new EventEmitter<void>();
  public letras: string[] = [];
  public ingresadas: string[] = [];
  public colores: string[] = [];

  ngOnInit(): void {
    this.letras = this.palabra.split('');
    this.ingresadas = new Array(this.letras.length).fill('');
    this.colores = new Array(this.letras.length).fill('transparent');
  }

  onLetraChange(letra: string, index: number): void {
    this.ingresadas[index] = letra;
    this.checkWord();
  }

  checkWord(): void {
    if (this.turno === this.cont) {
      let wordGuessedCorrectly = true;
      this.colores.fill('transparent');
      const palabraArray = this.palabra.split('');

      // Check for correct letters in correct position
      this.ingresadas.forEach((letra, index) => {
        if (letra === this.palabra[index]) {
          this.colores[index] = 'green';
          palabraArray[index] = '';
        } else {
          wordGuessedCorrectly = false;
        }
      });

      // Check for correct letters in incorrect position
      this.ingresadas.forEach((letra, index) => {
        if (this.colores[index] !== 'green' && palabraArray.includes(letra)) {
          this.colores[index] = 'orange';
          palabraArray[palabraArray.indexOf(letra)] = '';
        }
      });

      // Remaining letters are incorrect
      this.ingresadas.forEach((letra, index) => {
        if (this.colores[index] === 'transparent') {
          this.colores[index] = 'grey';
        }
      });

      // Emit event if the word was guessed correctly
      if (wordGuessedCorrectly) {
        this.wordGuessed.emit();
      }
    }
  }

  resetIngresadas(): void {
    this.ingresadas = new Array(this.letras.length).fill('');
    this.colores = new Array(this.letras.length).fill('transparent');
  }
}
