import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RhService } from '../../rh.service';
import { rhState } from '../../reducers/rh.reducer';
import { Store } from '@ngrx/store';
import { SharedService } from 'src/app/Shared/shared.service';
import { Funcionario } from '../../models/funcionario.model';
import { Gratificacao } from '../../models/gratificacao.model';
import { tipoGratificacao } from '../../models/tipoGratificacao';

@Component({
  selector: 'app-genrenciar-funcionario',
  templateUrl: './genrenciar-funcionario.component.html',
  styleUrls: ['./genrenciar-funcionario.component.scss']
})
export class GenrenciarFuncionarioComponent implements OnInit {

  tipoGratificacao: tipoGratificacao = new tipoGratificacao();
  formTipoGratificacao: FormGroup;

  constructor (
    private store: Store<rhState>,
    private service: RhService,
    private router : Router,
    private fb: FormBuilder,
    private shared: SharedService){
    this.formTipoGratificacao = this.creatForm();
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


}
