import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { ClienteService } from '../cliente.service';
import { of } from 'rxjs';

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
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nome: [''],
      cpf: [''],
      cep: [''],
      logradouro: [''],
      bairro: [''],
      localidade: [''],
      uf: ['']
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
