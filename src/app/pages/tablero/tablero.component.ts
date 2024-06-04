import { Component, OnInit } from '@angular/core';
import { PalabraService } from 'src/app/services/palabra.service';
import { RecordService } from 'src/app/services/record.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass']
})
export class TableroComponent implements OnInit {
  nivelesVisibles: boolean = false;
  public palabras: string[] = [];
  public palabra: string = '';
  public tiempo: number = 0;
  public turno = 0;
  public nivel: string = 'normal';
  public intentosNivel: number = 6;
  public Usuario: string = '';
  private intervalo: any;
  public iteracion: { letras: string[], clases: string[], showColors: boolean }[] = [];
  public records: { id: string, nombre: string, tiempo: number, victorias: number, partidasJugadas: number }[] = [];
  public errorMensaje: string = '';

  constructor(
    private palabraSer: PalabraService,
    private recordService: RecordService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.Usuario = this.dataService.getNombreUsuario();
    this.palabraSer.get().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.palabras.push(element.palabra);
      });
      this.seleccionarPalabra();
    });
    this.cargarRecords();
  }

  toggleNiveles(): void {
    this.nivelesVisibles = !this.nivelesVisibles;
  }

  seleccionarPalabra(): void {
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.iteracion = Array.from({ length: this.intentosNivel }, () => ({
      letras: Array(this.palabra.length).fill(''),
      clases: Array(this.palabra.length).fill(''),
      showColors: false
    }));
  }

  obtenerIntentos(): number {
    switch (this.nivel) {
      case 'facil':
        return 8;
      case 'normal':
        return 6;
      case 'dificil':
        return 3;
      default:
        return 6;
    }
  }

  avanzarTurno(): void {
    if (this.iteracion[this.turno].letras.includes('')) {
      alert('Ingresa todas las letras por favor');
      return;
    }

    this.errorMensaje = '';

    this.iteracion[this.turno].showColors = true;
    this.verificarVictoria();

    if (this.turno >= this.intentosNivel - 1) {
      if (!this.iteracion[this.turno].clases.every(clase => clase === 'acierto')) {
        this.detenerCronometro();
        alert(`Has perdido, no tienes más intentos. La palabra era: ${this.palabra}`);
        this.actualizarPartidasJugadas();
        this.reiniciarJuego();
      }
      return;
    }

    this.turno++;
  }

  verificarVictoria(): void {
    const todasAciertos = this.iteracion[this.turno].clases.every(clase => clase === 'acierto');
    if (todasAciertos) {
      this.detenerCronometro();
      const recordExistente = this.records.find(record => record.nombre === this.Usuario);
      if (recordExistente) {
        recordExistente.victorias++;
        recordExistente.partidasJugadas++;
        recordExistente.tiempo = this.tiempo;
        this.recordService.updateRecord(recordExistente).subscribe(() => {
          this.cargarRecords();
        });
      } else {
        this.recordService.addRecord({
          nombre: this.Usuario,
          tiempo: this.tiempo,
          victorias: 1,
          partidasJugadas: 1
        }).subscribe(() => {
          this.cargarRecords();
        });
      }
      setTimeout(() => {
        alert('¡Felicidades Has Acertado!');
        this.reiniciarJuego();
      }, 500);
    }
  }

  actualizarPartidasJugadas(): void {
    const recordExistente = this.records.find(record => record.nombre === this.Usuario);
    if (recordExistente) {
      recordExistente.partidasJugadas++;
      this.recordService.updateRecord(recordExistente).subscribe(() => {
        this.cargarRecords();
      });
    } else {
      this.recordService.addRecord({
        nombre: this.Usuario,
        tiempo: this.tiempo,
        victorias: 0,
        partidasJugadas: 1
      }).subscribe(() => {
        this.cargarRecords();
      });
    }
  }

  iniciarCronometro(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    this.intervalo = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  detenerCronometro(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  reiniciarJuego(): void {
    this.turno = 0;
    this.tiempo = 0;
    this.intentosNivel = this.obtenerIntentos();
    this.seleccionarPalabra();
    this.detenerCronometro();
  }

  actualizarLetra(event: { letra: string, indice: number, estado: string }): void {
    this.iteracion[this.turno].letras[event.indice] = event.letra;
    this.iteracion[this.turno].clases[event.indice] = event.estado;
  }

  cambioDeNivel(nuevoNivel: string): void {
    const confirmar = window.confirm('Estas seguro que quieres cambiar el nivel de dificultad, tus resultados se perderan. ¿Desea continuar?');
    if (confirmar) {
      this.nivel = nuevoNivel;
      this.intentosNivel = this.obtenerIntentos();
      this.reiniciarJuego();
    }
  }

  cargarRecords(): void {
    this.recordService.getRecords().subscribe((records: any[]) => {
      console.log('Records fetched:', records);  // Debugging
      this.records = records;
    }, error => {
      console.error('Error fetching records:', error);  // Debugging
    });
  }

  eliminarRecord(id: string): void {
    this.recordService.deleteRecord(id).subscribe(() => {
      console.log('Record deleted:', id);  // Debugging
      this.cargarRecords();
    }, error => {
      console.error('Error deleting record:', error);  // Debugging
    });
  }
}
