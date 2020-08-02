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

    const cliente = this.route.snapshot.data['cliente'];

    this.listEstado(cliente)

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

  listEstado(estadoSelecionado) {
  
    this.clienteService.getEstadosBr()
      .pipe(
        catchError(err => of(console.log(err)))
      )
      .subscribe(
        (res: Estados[]) => {
          this.estados = res

        if(estadoSelecionado['id']){
          let oEstado = estadoSelecionado['estado']['uf']['nome']

            this.compareFn(oEstado, this.estados)
        }
        }
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

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnDestroy() {
    if (this.listCidades$) {
      this.listCidades$.unsubscribe();
      //  this.listCidades$.unsubscribe();ActivatedRoute']
    }
  }
}
