import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';


@NgModule({
  declarations: [ClientesListaComponent, ClienteFormComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
