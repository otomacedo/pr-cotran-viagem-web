import { Component, OnInit } from '@angular/core';
import { RhService } from '../../rh.service';
import { Funcionario } from '../../models/funcionario.model';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.scss']
})
export class ListarFuncionariosComponent implements OnInit {

  constructor(private service: RhService) { }

  funcionarios: Funcionario[];

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  cadastrarFuncionario(){
    
  }

  excluirFuncionario(funcionario:Funcionario){
    return this.service.excluir(funcionario).subscribe(data=>{
      this.listarFuncionarios()
      console.log(data)
    })
  }
  consultarFuncionario(){

  }
  listarFuncionarios(){
    this.service.listarFuncionarios().subscribe(dados=>{
      this.funcionarios = dados;
    });
  }

}
