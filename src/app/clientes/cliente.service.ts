import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:3000/clientes';

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Cliente[]>(this.API)
  }
}
