import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClienteService } from '../cliente.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {


    const cliente = this.route.snapshot.data['cliente']

    console.log(cliente, 'cliente')

    this.profileForm = this.fb.group({
      id: [cliente.id],
      nome: [cliente.nome],
      cpf: [cliente.cpf],
      cep: [cliente.cep],
      logradouro: [cliente.logradouro],
      bairro: [cliente.bairro],
      localidade: [cliente.localidade],
      uf: [cliente.uf]
    })
  }

  

  onSubmit() {
    this.submitted = true;

    let cliente = this.profileForm.value;
    if(this.profileForm.valid) {
      this.clienteService.create(cliente)
        .pipe(
          catchError(err => of(console.log(err)))
        ).subscribe(res => {
          setTimeout(() => {
            this.router.navigate(['/lista-cliente'])
            alert('Cliente cadastrado com sucesso!')
          }, 1000)
          
        })
    } 
  }

  onCancel() {
    this.submitted = false;
    this.profileForm.reset();
    //console.log('On Cancel')
  }

}
