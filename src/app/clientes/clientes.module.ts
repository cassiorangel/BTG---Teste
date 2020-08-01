import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';


@NgModule({
  declarations: [ClientesListaComponent, ClienteFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
