import { Component, OnInit } from '@angular/core';
import { PalabraService } from 'src/app/services/palabra.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass'],
})
export class TableroComponent implements OnInit {
  //conjunto de palabras posibles
  public palabras: String[]=[];
  //palabra a adivinar
  public palabra: String = '';
  public iteracion: any[] = [];
  public turno = 0;

  constructor(
    public palabraSer: PalabraService
  ) {}
  ngOnInit(): void {
    //this.palabras= ['colas', 'adios', 'casas', 'perro', 'gatos', 'raton', 'antes','leona', 'tigre', 'patos','minas','cabas','vacas','cerdo', 'oveja', 'monos', 'gotas', 'giros', 'cocos', 'pulpo', 'pulga', 'abuel', 'galax', 'unive', 'nebul', 'super']
    this.palabraSer.get().subscribe((res: any) => {
      res.forEach((Element: any) => {
        this.palabras.push(Element.palabra)
      });
      this.palabra = this.palabras[Math.floor(Math.random()*this.palabras.length)]
      this.iteracion = new Array(6).fill('');
    });
    
  }
}
