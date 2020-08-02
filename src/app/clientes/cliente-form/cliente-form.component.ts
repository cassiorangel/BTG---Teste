import { Cidades } from './../../models/cidades';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { ClienteService } from '../cliente.service';
import { of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Estados } from 'src/app/models/estados';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  estados: Estados[];

  cidades: Cidades[];

  visaoCidade: boolean = false;

  listCidades$: Subscription;

  profileForm: FormGroup;

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.listEstado()

    const cliente = this.route.snapshot.data['cliente'];

    console.log(cliente, 'cliente')

    this.profileForm = this.fb.group({
      id: [cliente.id],
      nome: [cliente.nome],
      cpf: [cliente.cpf],
      cep: [cliente.cep],
      logradouro: [cliente.logradouro],
      bairro: [cliente.bairro],
      estado: this.fb.group({
        uf: [cliente.estado.uf]
      }),
      cidade: this.fb.group({
        localidade: [cliente.localidade]
      })
      
    })
  }

  onSubmit() {
    // return console.log('cliente', this.profileForm.value)
    this.submitted = true;

    let cliente = this.profileForm.value;

    if (this.profileForm.value['id']) {
      this.clienteService.update(this.profileForm.value)
        .pipe(
          catchError(err => of(console.log(err)))
        )
        .subscribe(res => {
          setTimeout(() => {
            this.router.navigate(['/lista-cliente'])
            alert('Cliente atualizado com sucesso!')
          }, 1000)

        })
    }
    else {
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

  listEstado() {
    this.clienteService.getEstadosBr()
      .pipe(
        catchError(err => of(console.log(err)))
      )
      .subscribe(
        (res: Estados[]) => this.estados = res
      )
  }

  changeCity() {
    console.log('a', this.profileForm.value['estado']['uf']['id'])

    let estado = this.profileForm.value['estado']['uf']['id'];
    
    this.clienteService.getCidades(estado)
      .pipe(
        map((res: any[]) => res.filter(resp => resp['estado'] == estado)),
        catchError(err => of(console.log(err)))
      )
      .subscribe((res: Cidades[]) => {
        this.visaoCidade = true;
        this.cidades = res;
      })
  }

  onCancel() {
    this.submitted = false;
    this.profileForm.reset();
    //console.log('On Cancel')
  }

  ngOnDestroy() {
    if (this.listCidades$) {
      this.listCidades$.unsubscribe();
      //  this.listCidades$.unsubscribe();ActivatedRoute']
    }
  }
}
