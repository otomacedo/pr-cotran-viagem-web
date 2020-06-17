import { Component, OnInit } from '@angular/core';
import { tipoGratificacao } from '../../models/tipoGratificacao';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { rhState } from '../../reducers/rh.reducer';
import { RhService } from '../../rh.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-gerenciar-funcionario',
  templateUrl: './gerenciar-funcionario.component.html',
  styleUrls: ['./gerenciar-funcionario.component.scss']
})
export class GerenciarFuncionarioComponent implements OnInit {

  tipoGratificacao: tipoGratificacao = new tipoGratificacao();
  formTipoGratificacao: FormGroup;

  constructor (
    private store: Store<rhState>,
    private service: RhService,
    private router : Router,
    private fb: FormBuilder,
    private shared: SharedService)
    {
    this.formTipoGratificacao= this.creatForm();
    }
  ngOnInit(): void {
  }

  creatForm(){
    return this.fb.group ({
      idTipoGratificacao : new FormControl(''),
      tipo : new FormControl('')
    })
  }
  public preencheForm(tipoGratificacao: tipoGratificacao){
    this.formTipoGratificacao.controls.idTipoGratificacao.setValue(tipoGratificacao.idTipoGratidicacao);
    this.formTipoGratificacao.controls.tipo.setValue(tipoGratificacao.tipo);
  }
  voltar(){
    return this.router.navigate(['/','funcionarios']);
  }
}
