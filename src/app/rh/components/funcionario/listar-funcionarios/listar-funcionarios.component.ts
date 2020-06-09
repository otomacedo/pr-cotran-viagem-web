import { Component, OnInit } from '@angular/core';
import { RhService } from '../../../rh.service';
import { BehaviorSubject } from 'rxjs';
import { Funcionario } from 'src/app/rh/models/funcionario.model';
import { Store } from '@ngrx/store';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { AddFuncionario, ModoTela } from 'src/app/rh/actions/rh.actions';
import { Rh } from 'src/app/rh/models/rh.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.scss']
})
export class ListarFuncionariosComponent implements OnInit {

  constructor(private service: RhService, private store: Store<rhState>, private router: Router) { }

  
  funcionarios: Funcionario[];

  ngOnInit(): void {
    this.store.dispatch(new ModoTela("CADASTRAR"));
    this.listarFuncionarios();
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
    this.service.listarFuncionarios().subscribe(dados => {
      this.funcionarios = dados;
    });
  }

  voltar(){
    return this.router.navigate(['/','inicio']);
  }

}
