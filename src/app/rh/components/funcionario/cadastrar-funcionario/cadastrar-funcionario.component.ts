import { Component, OnInit, Input } from '@angular/core';
import { RhService } from '../../../rh.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/rh/models/funcionario.model';
import { rhState, selectFuncionario, selectModoTela } from 'src/app/rh/reducers/rh.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent implements OnInit {

  funcionario: Funcionario;
  $funcionario =  this.store.pipe(select(selectFuncionario));
  modoTela: String;
  formFuncionario : FormGroup

  @Input() funcionarioInput: Funcionario;
  constructor(private store: Store<rhState>, private service: RhService, private router:Router,private fb: FormBuilder) {
  this.formFuncionario = this.createForm();
  }
  ngOnInit(): void {

    this.modoTela == "EDITAR" ?
   this.$funcionario.subscribe(funcionario=>{
     this.funcionario = funcionario;
   }) : this.funcionario = new Funcionario();
    
    this.store.pipe(select(selectModoTela)).subscribe(modo=>{
      this.modoTela = modo;
    })
  }

  public salvar(){
    if(this.modoTela == 'CADASTRAR')
       this.cadastrarFuncionario();
    else if( this.modoTela == 'EDITAR')
      this.editarFuncionario();
  }


  public cadastrarFuncionario() {
    return  this.service.cadastrarFuncionario(this.funcionario).subscribe(data=>{console.log(data)});
    
  } 

  public excluirFuncionario() {
    return this.service.excluir(this.funcionario).subscribe(data=>{console.log(data)});
  }

  editarFuncionario(){
    return this.service.editarFuncionario(this.funcionario).subscribe(data=>{
      console.log(data);
    })
  }

  voltar(){
    return this.router.navigate(['/','funcionarios']);
  }

  createForm(){
    return  this.fb.group({
      idFuncionario: new FormControl(''),
      nome: new FormControl("Teste"),
      nomeGuerra: new FormControl(''),
      endereco: new FormControl(''),
      cidade: new FormControl(''),
      bairro: new FormControl(''),
      dtNascimento: new FormControl(''),
      ramal: new FormControl(''),
      telefone: new FormControl(''),
      rg: new FormControl(''),
      orgaoExpedidorRg: new FormControl(''),
      dtExpedicaoRg: new FormControl(''),
      cpf: new FormControl(''),
      cnh: new FormControl(''),
      validadeCnh: new FormControl(''),
      categoriaCnh: new FormControl(''),
      numPassaporte: new FormControl(''),
      validadePassaporte: new FormControl(''),
      dtExpedicaoPassaporte: new FormControl(''),
      inscricaoTitulo: new FormControl(''),
      zonaTitulo: new FormControl(''),
      secaoTitulo: new FormControl('')

    })
  }
  
}
