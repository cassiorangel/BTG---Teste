import { Cliente } from './../../models/cliente';
import { ClienteService } from './../cliente.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss']
})
export class ClientesListaComponent implements OnInit {

  cursoSelecionado: Cliente;

  modalRef: BsModalRef;

  list$: Subscription;

  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
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
        console.log('inicio', this.clientes)
        
      })
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route })
  }

  onDelete(cliente, deleteModal: TemplateRef<any>) {
    this.cursoSelecionado = cliente['id'];
    this.modalRef = this.modalService.show(deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    let id = this.cursoSelecionado;
    this.clienteService.remove(id)
      .pipe(
        catchError(err => of(console.log(err)))
      )
      .subscribe(res => alert('Delete realizado com sucesso'))
  }
  onDeclineDelete() {
    this.modalRef.hide();
  }

  ngOnDestroy() {
    
    if(this.list$) {
      this.list$.unsubscribe();
    } 
  }
}
