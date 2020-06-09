import { Component, OnInit, Input } from '@angular/core';
import { RhService } from '../../../rh.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/rh/models/funcionario.model';
import { rhState, selectFuncionario, selectModoTela } from 'src/app/rh/reducers/rh.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent implements OnInit {

  funcionario: Funcionario;
  modoTela: String;

  @Input() funcionarioInput: Funcionario;
  constructor(private store: Store<rhState>, private service: RhService) {
    this.store.pipe(select(selectFuncionario)).subscribe(funcionario=>{
      this.funcionario = funcionario;
    })

  }
  ngOnInit(): void {

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
    return this.service.cadastrarFuncionario(this.funcionario).subscribe(data=>{console.log(data)});
  }

  public excluirFuncionario() {
    return this.service.excluir(this.funcionario).subscribe(data=>{console.log(data)});
  }

  editarFuncionario(){
    return this.service.editarFuncionario(this.funcionario).subscribe(data=>{
      console.log(data);
    })
  }
  
}
