import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { rhState, selectFuncionario, selectModoTela, selectRh } from '../../reducers/rh.reducer';
import { RhService } from '../../rh.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Shared/shared.service';
import { Funcionario } from '../../models/funcionario.model';
import { Rh } from '../../models/rh.model';
import { Atividade } from '../../models/atividade.model';
import { Gratificacao } from '../../models/gratificacao.model';
import { DepartamentoComponent } from 'src/app/administracao/components/departamento/departamento.component';
import { Departamento } from '../../models/departamento.model';
import { Setor } from '../../models/setor.model';
import { Graduacao } from '../../models/graduacao.model';
import { TipoGratificacao } from '../../models/tipoGratificacao.model';
import { AddRh } from '../../actions/rh.actions';

@Component({
  selector: 'app-gerenciar-funcionario',
  templateUrl: './gerenciar-funcionario.component.html',
  styleUrls: ['./gerenciar-funcionario.component.scss']
})
export class GerenciarFuncionarioComponent implements OnInit {

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

  constructor (
    private store: Store<rhState>,
    private service: RhService,
    private router : Router,
    private fb: FormBuilder,
    private shared: SharedService)
    {
    this.formRh= this.creatForm();
    this.listarAtividade();
    this.listarGratificacao();
    this.listarDepartamento();
    this.listarSetor();  
    this.listarGraduacao();
    }
  ngOnInit(): void {
    this.carregarModoTela()
    this.carregarTipo();
    this.store.pipe(select(selectRh)).subscribe(
      rh => {
            if(rh.idRh != null){
              this.rh = rh;
              this.preencheForm();
            }
        this.rh.funcionario = rh.funcionario;
      }
    );  
  }

  salvarRh(){
    this.converterCheckbox();
    return this.service.salvarRh(this.rhDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);

    })
  }

  editarRh(){
    return this.service.editarRh(this.rhDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);
    })
  }

  incluirEditar(){
    if(this.formRh.valid){
      if(this.rh.idRh == null)
        this.salvarRh();
      else
        this.editarRh();
    }else
      this.shared.mensagemErro("Formulário contém erros!");
  }

  creatForm(){
    return this.fb.group ({
      idRh: new FormControl(''),
      funcionario : new FormControl(''),
      departamento : new FormControl('',Validators.required),
      atividade :new FormControl('',Validators.required),
      setor: new FormControl('',Validators.required),
      graduacao: new FormControl('',Validators.required),
      gratificacao: new FormControl('',Validators.required),
      tipoGratificacoes: new FormControl('',Validators.required),
      possePr: new FormControl('',Validators.required),
      matriculaSiape: new FormControl('',Validators.required),
      orgaoOrigem: new FormControl('',Validators.required),
      matriculaPr: new FormControl('',Validators.required),
      tercerizado: new FormControl(''),
      observacao: new FormControl('')   
    })
  }
  public preencheForm(){

    this.formRh.controls.departamento.setValue(this.validarId(this.rh.departamento.idDepartamento));
    this.formRh.controls.atividade.setValue(this.validarId(this.rh.atividade.idAtividade));
    this.formRh.controls.setor.setValue(this.validarId(this.rh.setor.idSetor));
    this.formRh.controls.graduacao.setValue(this.validarId(this.rh.graduacao.idGraduacao)); 
    this.formRh.controls.gratificacao.setValue(this.validarId(this.rh.gratificacao.idGratificacao));
    this.formRh.controls.tipoGratificacoes.setValue(this.validarId(this.rh.tipo.idTipoGratificacao));
    this.formRh.controls.possePr.setValue(this.validarId(this.shared.formatarData(this.rh.possePr)));
    this.formRh.controls.matriculaSiape.setValue(this.validarId(this.rh.matriculaSiape));
    this.formRh.controls.matriculaPr.setValue(this.validarId(this.rh.matriculaPr));
    this.formRh.controls.orgaoOrigem.setValue(this.validarId(this.rh.orgaoOrigem));
    this.formRh.controls.tercerizado.setValue(this.validarId(this.rh.tercerizado));
    this.formRh.controls.observacao.setValue(this.validarId(this.rh.observacao));

  }

  public rhDTO(): Rh{
    this.preencherDTO()
    let rhDTO:Rh = new Rh();
    rhDTO.idRh = this.rh.idRh;
    rhDTO.funcionario = this.rh.funcionario;
    rhDTO.atividade = this.atividadeDTO;
    rhDTO.departamento = this.departamentoDTO;
    rhDTO.graduacao = this.graduacaoDTO;
    rhDTO.gratificacao = this.gratificacaoDTO;
    rhDTO.setor = this.setorDTO;
    rhDTO.tipo = this.tipoGratificacaoDTO;
    rhDTO.matriculaPr = this.formRh.controls.matriculaPr.value;
    rhDTO.matriculaSiape = this.formRh.controls.matriculaSiape.value;
    rhDTO.orgaoOrigem = this.formRh.controls.orgaoOrigem.value;
    rhDTO.possePr = this.formRh.controls.possePr.value;
    rhDTO.tercerizado = this.formRh.controls.tercerizado.value;
    rhDTO.observacao = this.formRh.controls.observacao.value;
    return rhDTO;
  }

  public listarAtividade(){
    return this.service.listarAtividade().subscribe(atividades =>{
      this.atividade = atividades;
    })
  }

  public listarSetor(){
    return this.service.listarSetor().subscribe(setores=>{
      this.setor = setores;
    })
  }

  public listarDepartamento(){
    return this.service.listarDepartamento().subscribe(departamentos=>{
      this.departamento = departamentos;
    })
  }

  public listarGraduacao(){
    return this.service.listarGraduacao().subscribe(graduacoes=>{
      this.graduacao = graduacoes;
    })
  }
  public salvar(rh: Rh){
    
  }
  public listarGratificacao(){
    return this.service.listarGratificacao().subscribe(gratificacoes =>{
      this.gratificacao = gratificacoes;
    })
  }


  voltar(){
    this.service.consultarPorFuncionario(this.rh.funcionario.idFuncionario).subscribe(
      r=>{
          this.store.dispatch(new AddRh(r));
          return this.router.navigate(['/','perfilFuncionario']);          
      }
    )
  }

  private carregarTipo(){
    this.formRh.controls.tipoGratificacoes.value

    if(this.formRh.controls.tipoGratificacoes.value == undefined)
        this.formRh.controls.tipoGratificacoes.disable()
    this.formRh.controls.gratificacao.valueChanges.subscribe(v=>{
      this.gratificacao.forEach(g=>{
        if(g.idGratificacao == v){
          this.formRh.controls.tipoGratificacoes.enable()
          this.tipoGratificacao = g.tipoGratificacoes
        }
        if(v == ""){
          this.formRh.controls.tipoGratificacoes.disable()
          this.tipoGratificacao = []
        }
          
      })
    })
  }

  private carregarModoTela(){
    this.store.pipe(select(selectModoTela)).subscribe(modo=>{
      this.modoTela = modo;
    })
  }

  private preencherDTO(){
    this.atividadeDTO.idAtividade = this.formRh.controls.atividade.value;
    this.departamentoDTO.idDepartamento = this.formRh.controls.departamento.value;
    this.graduacaoDTO.idGraduacao = this.formRh.controls.graduacao.value;
    this.gratificacaoDTO.idGratificacao = this.formRh.controls.gratificacao.value;
    this.setorDTO.idSetor = this.formRh.controls.setor.value;
    this.tipoGratificacaoDTO.idTipoGratificacao = this.formRh.controls.tipoGratificacoes.value;
  }

  validarId(id){
    return id === undefined ? "": id;
  }

  inativar(){
   var funcionario = new Funcionario();
   funcionario.idFuncionario = this.rh.funcionario.idFuncionario
   funcionario.status = false;
   return this.atualizarStatus(funcionario);
  }

  ativar(){
    var funcionario = new Funcionario();
    funcionario.idFuncionario = this.rh.funcionario.idFuncionario
    funcionario.status = true;
    return this.atualizarStatus(funcionario);
    
  }

  private atualizarStatus(funcionario:Funcionario){
    return this.service.atualizarStatusFuncionario(funcionario).subscribe(data => {
      this.shared.mensagemSucesso(data["mensagem"]);
      this.voltar();
    })
  }

  converterCheckbox(){
    if (this.formRh.controls.tercerizado.value == "0" ){
          this.formRh.controls.tercerizado.setValue(false)
    }
      this.formRh.controls.tercerizado.setValue(true)
  }
}
