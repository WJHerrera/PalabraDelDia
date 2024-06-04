import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private UsuarioKey = 'nombreUsuario';

  setNombreUsuario(nombre: string): void {
    localStorage.setItem(this.UsuarioKey, nombre);
  }

  getNombreUsuario(): string {
    return localStorage.getItem(this.UsuarioKey) || '';
  }
}
