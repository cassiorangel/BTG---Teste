import { Estados } from './../models/estados';
import { Cidades } from './../models/cidades';
import { environment } from './../../environments/environment';
import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = `${environment.API}clientes`;

  private readonly API_CIDADES = `${environment.API}cidades`;

  private readonly API_ESTADOS = `${environment.API}estados`;

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Cliente[]>(this.API);
  }
  
  loadById(id) {
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(take(1));
  }
  
  create(cliente) {
    return this.http.post(this.API, cliente).pipe(take(1));
  }
  update(cliente) {
    return this.http.put(`${this.API}/${cliente.id}`, cliente).pipe(take(1));
  }
  getEstadosBr() {
    return this.http.get<Estados[]>(`${this.API_ESTADOS}`)
  }
  getCidades(idEstado: number) {
    return this.http.get<Cidades[]>(this.API_CIDADES)
  }
  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }  
}
