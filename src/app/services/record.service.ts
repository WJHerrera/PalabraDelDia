import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiUrl = 'http://localhost:3000/record';

  constructor(private http: HttpClient) { }

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addRecord(record: { nombre: string, tiempo: number, victorias: number, partidasJugadas: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, record);
  }

  updateRecord(record: { id: string, nombre: string, tiempo: number, victorias: number, partidasJugadas: number }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${record.id}`, record);
  }

  deleteRecord(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
