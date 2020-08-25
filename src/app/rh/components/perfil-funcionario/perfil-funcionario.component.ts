import { Component, OnInit } from '@angular/core';
import { Rh } from '../../models/rh.model';
import { rhState, selectRh } from '../../reducers/rh.reducer';
import { Store, select } from '@ngrx/store';
import { RhService } from '../../rh.service';
import { SharedService } from 'src/app/Shared/shared.service';
import { TipoGratificacao } from '../../models/tipoGratificacao.model';
import { Graduacao } from '../../models/graduacao.model';
import { Setor } from '../../models/setor.model';
import { Gratificacao } from '../../models/gratificacao.model';
import { Departamento } from '../../models/departamento.model';
import { Atividade } from '../../models/atividade.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddRh } from '../../actions/rh.actions';
import { Funcionario } from '../../models/funcionario.model';
import { faCoffee, faIcicles, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-perfil-funcionario',
  templateUrl: './perfil-funcionario.component.html',
  styleUrls: ['./perfil-funcionario.component.scss']
})
export class PerfilFuncionarioComponent implements OnInit {
  faCircle = faCircle
  formRh: FormGroup;
  rh: Rh = new Rh();
  atividade : Atividade[] = new Array();
  departamento : Departamento[]= new Array();
  gratificacao: Gratificacao[]= new Array();
  setor: Setor[]= new Array();
  graduacao: Graduacao[]= new Array();
  tipoGratificacao : TipoGratificacao[]= new Array();
  modoTela:String;

  atividadeDTO : Atividade = new Atividade();
  departamentoDTO : Departamento = new Departamento();
  gratificacaoDTO: Gratificacao = new Gratificacao();
  setorDTO: Setor = new Setor();
  graduacaoDTO: Graduacao = new Graduacao();
  tipoGratificacaoDTO: TipoGratificacao = new TipoGratificacao();

  constructor(private store: Store<rhState>,
              private service: RhService,
              private shared: SharedService,
              private router : Router,
              private fb: FormBuilder) 
            {
             }
             funcionarios: Funcionario[];
  ngOnInit(): void {
      this.store.pipe(select(selectRh)).subscribe(r=>{
        this.rh = r;
      })
  }

  editarRh(){
    this.store.dispatch(new AddRh(this.rh));
    return this.router.navigate(['/','gerenciarFuncionario']);
    
  }
  listarFuncionarios() {
    this.service.listarFuncionarios().subscribe(dados => {
      this.funcionarios = dados;
    });
  }
  voltar(){
    return this.router.navigate(['/','funcionarios']);
  }
  marcarFerias(rh: Rh){
    this.store.dispatch(new AddRh(Object.assign({},rh,{
      details: { closed: true }
    })));
    return this.router.navigate(['/','ferias']);
  }
  }

 

  

