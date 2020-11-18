import { Component, OnInit } from '@angular/core';
import { RhService } from '../../../rh.service';
import { BehaviorSubject } from 'rxjs';
import { Funcionario } from 'src/app/rh/models/funcionario.model';
import { Store } from '@ngrx/store';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { AddFuncionario, ModoTela, AddRh } from 'src/app/rh/actions/rh.actions';
import { Rh } from 'src/app/rh/models/rh.model';
import { Router } from '@angular/router';
import { Ferias } from 'src/app/rh/models/ferias.model';
import { filtro } from 'src/app/rh/models/filtro.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.scss']
})
export class ListarFuncionariosComponent implements OnInit {
  formFiltro: FormGroup;
 

  public tipos : filtro[]= [
    new filtro("Nome",1),
    new filtro("Nome de Guerra",2),
    new filtro("Cpf",3),
    new filtro("Rg",4),
    new filtro("Ramal",5)
  ]
  constructor(private fb: FormBuilder,private service: RhService, private store: Store<rhState>, private router: Router) 
  {
   
   }


  funcionarios: Funcionario[];
  rhs: Rh[];
  p: number = 1;

  ngOnInit(): void {
    this.store.dispatch(new ModoTela("CADASTRAR"));
    this.listarFuncionarios();
  }
  private createForm(){
    return this.fb.group({
      valor:new FormControl(''),
      tipo: new FormControl('')
    })
  }
  cadastrarFuncionario() {
    return this.router.navigate(['/','cadastrarFuncionario']);
  }

  excluirFuncionario(funcionario: Funcionario) {
    return this.service.excluir(funcionario).subscribe(data => {
      this.listarFuncionarios()
      console.log(data)
    })
  }
  
  editarFuncionario(funcionario:Funcionario){
    let rh = new Rh();
    rh.funcionario = funcionario;
    this.store.dispatch(new AddFuncionario(rh));
    this.store.dispatch(new ModoTela("EDITAR"));
    return this.router.navigate(['/','cadastrarFuncionario']);
  }


  consultarFuncionario() {

  }


  listarFuncionarios() {
    this.service.listarFuncionariosAtivos().subscribe(dados => {
      this.funcionarios = dados;
    });
  }

  listarFuncionariosInativos() {
    this.service.listarFuncionariosInativos().subscribe(dados => {
      this.funcionarios = dados;
    });
  }

  listarTercerizados(){
    this.funcionarios = []
    this.service.listarTercerizados().subscribe(dados => {
      this.rhs = dados;
      this.rhs.forEach(rh =>{
        this.funcionarios.push(rh.funcionario)
      })
    })
  }
  gerenciarFuncionario(funcionario : Funcionario){
    
    this.service.consultarPorFuncionario(funcionario.idFuncionario).subscribe(
      r=>{
        if(r.idRh != null){
          this.store.dispatch(new AddRh(r));
          return this.router.navigate(['/','perfilFuncionario']);
        }else{
          let rh=new Rh();
          rh.funcionario = funcionario;
          this.store.dispatch(new AddRh(rh));
            return this.router.navigate(['/','gerenciarFuncionario']);
        }
          
      }
    )

  }

  voltar(){
    return this.router.navigate(['/','inicio']);
  }
  filtrar(){
    let f: filtro = new filtro(
      this.formFiltro.controls.valor.value,
      this.formFiltro.controls.tipo.value
    )
    return this.service.filtrarFuncionarios(f).subscribe(
      funcionarios=>{
        this.funcionarios = funcionarios
      }
    )
  }

} 
