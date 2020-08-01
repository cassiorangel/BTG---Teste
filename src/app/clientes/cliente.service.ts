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

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Cliente[]>(this.API)
  }
  
  loadById(id) {
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(take(1))
  }
  
  create(cliente) {
    return this.http.post(this.API, cliente).pipe(take(1))
  }
}
