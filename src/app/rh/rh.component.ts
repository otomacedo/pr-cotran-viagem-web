import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RhService } from './rh.service';
import { rhState } from './reducers/rh.reducer';
import { Rh } from './models/rh.model';
import { Funcionario } from './models/funcionario.model';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.scss']
})
export class RhComponent implements OnInit {

  constructor(private service: RhService, private store: Store<rhState>, private router: Router) { }

  funcionarios: Funcionario[];
  ngOnInit(): void {
  }

  listarFuncionarios() {
    this.service.listarFuncionarios().subscribe(dados => {
      this.funcionarios = dados;
    });
  }
salvarRh(){

}
editarRh(){

}
consultarRh(){

}

ListarRhs(){
  
}


}
