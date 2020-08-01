import { ClienteResolverGuard } from './../guards/cliente-resolver.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesListaComponent
  },
  {
    path: 'novo',
    component: ClienteFormComponent,
    resolve: {
      cliente: ClienteResolverGuard
    }
  },
  {
    path: 'editar/:id',
    component: ClienteFormComponent,
    resolve: {
      cliente: ClienteResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
