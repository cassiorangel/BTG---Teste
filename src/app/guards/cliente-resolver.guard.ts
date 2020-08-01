import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClienteService } from '../clientes/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolverGuard implements Resolve<Cliente> {

  constructor(
    private clienteService: ClienteService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {
    if (route.params && route.params['id']) {
      return this.clienteService.loadById(route.params['id'])
    }
    return of({
      id: null,
      nome: null,
      cpf: null,
      cep: null,
      logradouro: null,
      bairro: null,
      localidade: null,
      uf: null
    })
  }
}
