import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { rhState, selectFuncionario } from '../../reducers/rh.reducer';
import { RhService } from '../../rh.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Shared/shared.service';
import { Funcionario } from '../../models/funcionario.model';
import { Rh } from '../../models/rh.model';

@Component({
  selector: 'app-gerenciar-funcionario',
  templateUrl: './gerenciar-funcionario.component.html',
  styleUrls: ['./gerenciar-funcionario.component.scss']
})
export class GerenciarFuncionarioComponent implements OnInit {

  formRh: FormGroup;
  rh: Rh = new Rh();

  constructor (
    private store: Store<rhState>,
    private service: RhService,
    private router : Router,
    private fb: FormBuilder,
    private shared: SharedService)
    {
    this.formRh= this.creatForm();
    }
  ngOnInit(): void {
    this.store.pipe(select(selectFuncionario)).subscribe(
      funcionario => {
        this.rh.funcionario = funcionario;
      }
    );

  }

  creatForm(){
    return this.fb.group ({
      idFuncionario : new FormControl(''),
      idDepartamento : new FormControl(''),
      idAtividade :new FormControl(''),
      idSetor: new FormControl(''),
      idGraduacao: new FormControl(''),
      idGratificacao: new FormControl(''),
      possePr: new FormControl(''),
      matriculaSiape: new FormControl(''),
      orgaoOrigem: new FormControl(''),
      matriculaPr: new FormControl('')    
    })
  }
  public preencheForm(){


  }


  voltar(){
    return this.router.navigate(['/','funcionarios']);
  }
}
