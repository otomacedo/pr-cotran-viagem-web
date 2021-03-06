import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RhService } from '../../../rh.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/rh/models/funcionario.model';
import { rhState, selectFuncionario, selectModoTela } from 'src/app/rh/reducers/rh.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Shared/shared.service';
import { AddFuncionario } from 'src/app/rh/actions/rh.actions';
import { Rh } from 'src/app/rh/models/rh.model';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent implements OnInit, OnDestroy {

  funcionario: Funcionario = new Funcionario();
  $funcionario =  this.store.pipe(select(selectFuncionario));
  modoTela: String;
  formFuncionario : FormGroup

  @Input() funcionarioInput: Funcionario;
  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService)

    {
  this.formFuncionario = this.createForm();
  }
  ngOnDestroy(): void {
    let rh = new Rh();
    rh.funcionario = new Funcionario();
    this.store.dispatch(new AddFuncionario(rh));
  }
  ngOnInit(): void {

    this.store.pipe(select(selectModoTela)).subscribe(modo=>{
      this.modoTela = modo;
    })

    this.store.pipe(select(selectFuncionario)).subscribe(funcionario=>{
      this.preencheForm(funcionario); 
    });
  }

  public salvar(){
    if(this.formFuncionario.valid){
      if
        (this.modoTela == 'CADASTRAR')
        this.cadastrarFuncionario();
      else  
        (this.modoTela == 'EDITAR')
        this.editarFuncionario();
  } else 
      this.shared.mensagemErro("Formulário contém erros!")
  }


  public cadastrarFuncionario() {
    return  this.service.cadastrarFuncionario(this.funcionarioDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);
      return  this.router.navigate(['/','funcionarios']);
    });
    
  } 

  editarFuncionario(){
    return this.service.editarFuncionario(this.funcionarioDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);
      return  this.router.navigate(['/','funcionarios']);
    })
  }  

  voltar(){
    return this.router.navigate(['/','funcionarios']);
  }

  private createForm(){
    return  this.fb.group({
      idFuncionario: new FormControl(''),
      nome: new FormControl('',Validators.required),
      nomeGuerra: new FormControl('',Validators.required),
      endereco: new FormControl('',Validators.required),
      cidade: new FormControl('',Validators.required),
      bairro: new FormControl('',Validators.required),
      dtNascimento: new FormControl('',Validators.required),
      ramal: new FormControl('',Validators.required),
      telefone: new FormControl('',Validators.required),
      rg: new FormControl('',Validators.required),
      orgaoExpedidorRg: new FormControl('',Validators.required),
      dtExpedicaoRg: new FormControl('',Validators.required),
      cpf: new FormControl('',Validators.required),
      cnh: new FormControl(''),
      validadeCnh: new FormControl(''),
      categoriaCnh: new FormControl(''),
      numPassaporte: new FormControl(''),
      validadePassaporte: new FormControl(''),
      dtExpedicaoPassaporte: new FormControl(''),
      inscricaoTitulo: new FormControl('',Validators.required),
      zonaTitulo: new FormControl('',Validators.required),
      secaoTitulo: new FormControl('',Validators.required),
      status: new FormControl(true),
      imagem: new FormControl()

    })
  }

  public preencheForm(funcionario: Funcionario) : void{

    this.formFuncionario.controls.idFuncionario.setValue(funcionario.idFuncionario);
    this.formFuncionario.controls.nome.setValue(funcionario.nome);
    this.formFuncionario.controls.nomeGuerra.setValue(funcionario.nomeGuerra);
    this.formFuncionario.controls.endereco.setValue(funcionario.endereco);
    this.formFuncionario.controls.cidade.setValue(funcionario.cidade);
    this.formFuncionario.controls.bairro.setValue(funcionario.bairro);
    this.formFuncionario.controls.dtNascimento.setValue(this.shared.formatarData(funcionario.dtNascimento));
    this.formFuncionario.controls.ramal.setValue(funcionario.ramal);
    this.formFuncionario.controls.telefone.setValue(funcionario.telefone);
    this.formFuncionario.controls.rg.setValue(funcionario.rg);
    this.formFuncionario.controls.orgaoExpedidorRg.setValue(funcionario.orgaoExpedidorRg);
    this.formFuncionario.controls.dtExpedicaoRg.setValue(this.shared.formatarData(funcionario.dtExpedicaoRg));
    this.formFuncionario.controls.cpf.setValue(funcionario.cpf);
    this.formFuncionario.controls.cnh.setValue(funcionario.cnh);
    this.formFuncionario.controls.validadeCnh.setValue(this.shared.formatarData(funcionario.validadeCnh));
    this.formFuncionario.controls.categoriaCnh.setValue(funcionario.categoriaCnh);
    this.formFuncionario.controls.numPassaporte.setValue(funcionario.numPassaporte);
    this.formFuncionario.controls.validadePassaporte.setValue(this.shared.formatarData(funcionario.validadePassaporte));
    this.formFuncionario.controls.dtExpedicaoPassaporte.setValue(this.shared.formatarData(funcionario.dtExpedicaoPassaporte));
    this.formFuncionario.controls.inscricaoTitulo.setValue(funcionario.inscricaoTitulo);
    this.formFuncionario.controls.zonaTitulo.setValue(funcionario.zonaTitulo);
    this.formFuncionario.controls.secaoTitulo.setValue(funcionario.secaoTitulo);
    this.formFuncionario.controls.status.setValue(funcionario.status);
    this.formFuncionario.controls.imagem.setValue(funcionario.imagem);
  }

  funcionarioDTO(): Funcionario{
    let funcionarioDTO = new Funcionario();

    funcionarioDTO.idFuncionario = this.formFuncionario.controls.idFuncionario.value;
    funcionarioDTO.nome = this.formFuncionario.controls.nome.value
    funcionarioDTO.nomeGuerra = this.formFuncionario.controls.nomeGuerra.value
    funcionarioDTO.numPassaporte = this.formFuncionario.controls.numPassaporte.value
    funcionarioDTO.orgaoExpedidorRg= this.formFuncionario.controls.orgaoExpedidorRg.value
    funcionarioDTO.ramal= this.formFuncionario.controls.ramal.value
    funcionarioDTO.rg= this.formFuncionario.controls.rg.value
    funcionarioDTO.secaoTitulo= this.formFuncionario.controls.secaoTitulo.value
    funcionarioDTO.telefone= this.formFuncionario.controls.telefone.value
    funcionarioDTO.validadeCnh= this.formFuncionario.controls.validadeCnh.value
    funcionarioDTO.validadePassaporte= this.formFuncionario.controls.validadePassaporte.value
    funcionarioDTO.zonaTitulo= this.formFuncionario.controls.zonaTitulo.value
    funcionarioDTO.bairro= this.formFuncionario.controls.bairro.value
    funcionarioDTO.categoriaCnh= this.formFuncionario.controls.categoriaCnh.value
    funcionarioDTO.cidade= this.formFuncionario.controls.cidade.value
    funcionarioDTO.cnh= this.formFuncionario.controls.cnh.value
    funcionarioDTO.cpf= this.formFuncionario.controls.cpf.value
    funcionarioDTO.dtExpedicaoPassaporte= this.formFuncionario.controls.dtExpedicaoPassaporte.value
    funcionarioDTO.dtExpedicaoRg= this.formFuncionario.controls.dtExpedicaoRg.value
    funcionarioDTO.dtNascimento= this.formFuncionario.controls.dtNascimento.value
    funcionarioDTO.endereco= this.formFuncionario.controls.endereco.value
    funcionarioDTO.inscricaoTitulo = this.formFuncionario.controls.inscricaoTitulo.value
    funcionarioDTO.status = this.formFuncionario.controls.status.value
    funcionarioDTO.imagem= this.formFuncionario.controls.imagem.value

    return funcionarioDTO;   
  }

}
