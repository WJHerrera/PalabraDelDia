import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PalabraService } from 'src/app/services/palabra.service';
import { PalabraComponent } from 'src/app/components/palabra/palabra.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass'],
})
export class TableroComponent implements OnInit {
  @ViewChildren(PalabraComponent) palabraComponents!: QueryList<PalabraComponent>;
  public palabras: string[] = [];
  public palabra: string = '';
  public iteracion: any[] = [];
  public turno = 0;
  public showDifficultyOptions = false;
  public showConfirmation = false;
  public difficultySelected = false;
  public pendingDifficulty: string = '';
  public showCorrectWord = false;

  public tiempo: number = 0;
  private cronometroInterval: any;

  constructor(
    public palabraSer: PalabraService
  ) {}

  ngOnInit(): void {
    this.palabraSer.get().subscribe((res: any) => {
      res.forEach((Element: any) => {
        this.palabras.push(Element.palabra);
      });
      this.setDifficulty('normal'); // Nivel por defecto
    });
  }

  toggleDifficulty(): void {
    this.showDifficultyOptions = !this.showDifficultyOptions;
  }

  confirmDifficultyChange(level: string): void {
    if (this.difficultySelected) {
      this.pendingDifficulty = level;
      this.showConfirmation = true;
    } else {
      this.setDifficulty(level);
    }
  }

  setDifficulty(level: string): void {
    let attempts = 6; // Default to 'normal' difficulty
    if (level === 'facil') {
      attempts = 8;
    } else if (level === 'dificil') {
      attempts = 3;
    }

    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.iteracion = new Array(attempts).fill('');
    this.turno = 0;
    this.showDifficultyOptions = false;
    this.showConfirmation = false;
    this.difficultySelected = true;
    this.showCorrectWord = false;
    this.resetIngresadas(); // Resetea las letras ingresadas
    this.resetCronometro(); // Resetea el cronómetro
  }

  cancelDifficultyChange(): void {
    this.pendingDifficulty = '';
    this.showConfirmation = false;
  }

  handleTurn(): void {
    this.turno += 1;
    if (this.turno >= this.iteracion.length) {
      // Se acaban los intentos, mostrar palabra correcta
      this.showCorrectWord = true;
      alert('Se han acabado los intentos. El juego se reiniciará.');
      setTimeout(() => {
        this.reiniciarJuego();
      }, 3000); // Espera 3 segundos antes de reiniciar el juego
    }
  }

  reiniciarJuego(): void {
    this.difficultySelected = false;
    this.showDifficultyOptions = true;
    this.turno = 0;
    this.palabra = '';
    this.iteracion = [];
    this.showCorrectWord = false;
    this.resetIngresadas(); // Resetea las letras ingresadas
    this.resetCronometro(); // Resetea el cronómetro
  }

  resetIngresadas(): void {
    this.palabraComponents.forEach((component) => {
      component.resetIngresadas();
    });
  }

  onPalabraAdivinada(): void {
    setTimeout(() => {
      this.reiniciarJuego();
    }, 3000); // Espera 3 segundos antes de reiniciar el juego
  }

  iniciarCronometro(): void {
    if (this.cronometroInterval) {
      clearInterval(this.cronometroInterval);
    }
    this.tiempo = 0;
    this.cronometroInterval = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  resetCronometro(): void {
    if (this.cronometroInterval) {
      clearInterval(this.cronometroInterval);
    }
    this.tiempo = 0;
  }
}