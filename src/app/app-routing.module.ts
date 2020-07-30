import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'lista-cliente',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
  },
  { path: '',   redirectTo: '/lista-cliente', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
