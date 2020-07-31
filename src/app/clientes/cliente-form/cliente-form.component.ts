import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClienteService } from '../cliente.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  profileForm: FormGroup;

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
/*
    this.route.params.subscribe(
      res => { 
        let id = res['id'];
        let cliente$ = this.clienteService.loadById(id)
        cliente$.subscribe(cliente => this.updateCliente(cliente))
        console.log(res['id'])
      }
    )
*/

this.route.params
  .pipe(
    map((params: any) => params['id']),
    switchMap(id => this.clienteService.loadById(id))
  )
  .subscribe(curso => this.updateCliente(curso))

    this.profileForm = this.fb.group({
      id: [null],
      nome: [''],
      cpf: [''],
      cep: [''],
      logradouro: [''],
      bairro: [''],
      localidade: [''],
      uf: ['']
    })
  }

  updateCliente(cliente) {
    this.profileForm.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf,
      cep: cliente.cep,
      logradouro: cliente.logradouro,
      bairro: cliente.bairro,
      localidade: cliente.localidade,
      uf: cliente.uf      
    })
  }

  onSubmit() {
    this.submitted = true;

    let cliente = this.profileForm.value;
    if(this.profileForm.valid) {
      this.clienteService.create(cliente)
        .pipe(
          catchError(err => of(console.log(err)))
        ).subscribe(res => alert('Cliente cadastrado com sucesso!'))
    } 
  }

  onCancel() {
    this.submitted = false;
    this.profileForm.reset();
    //console.log('On Cancel')
  }

}
