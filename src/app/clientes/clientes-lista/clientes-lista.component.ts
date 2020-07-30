import { Cliente } from './../../models/cliente';
import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss']
})
export class ClientesListaComponent implements OnInit {

  list$: Subscription;

  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.listClientes();
  }

  listClientes() {
    this.list$ = this.clienteService.list()
      .pipe(
        catchError(err => of(console.log('erro', err)))
      )
      .subscribe((res: Cliente[]) => {
        this.clientes = res;
        console.log(this.clientes)})
  }
  ngOnDestroy() {
    if(this.list$) {
      this.list$.unsubscribe();
    }
    
  }
}
