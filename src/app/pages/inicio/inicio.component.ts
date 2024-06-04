import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent {
  public nombre: string = '';
  public mostrarAdvertencia: boolean = false;

  constructor(private router: Router, private dataService: DataService) { }

  guardarNombre(): void {
    if (!this.nombre.trim()) {
      this.mostrarAdvertencia = true;
    } else {
      this.mostrarAdvertencia = false;
      this.dataService.setNombreUsuario(this.nombre);
      this.router.navigate(['/tablero']);
    }
  }
}
