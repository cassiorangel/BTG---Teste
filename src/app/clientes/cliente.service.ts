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
    
  }
}
