import { Component, OnInit } from '@angular/core';
import { RhService } from '../../rh.service';
import { Funcionario } from '../../models/funcionario.model';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent implements OnInit {

  funcionario: Funcionario = new Funcionario();

  constructor(private formBuild: FormBuilder, private service: RhService) {
    //this.createForm();
  }
  ngOnInit(): void {
  }

  public cadastrarFuncionario() {
    return this.service.cadastrarFuncionario(this.funcionario).subscribe(data=>{console.log(data)});
  }

  public excluirFuncionario() {
    return this.service.excluir(this.funcionario).subscribe(data=>{console.log(data)});
  }

  editarFuncionario(funcionario: Funcionario){
    return this.service.editarFuncionario(funcionario).subscribe(data=>{
      console.log(data);
    })
  }
  
  private createForm(): FormGroup {
    return this.formBuild.group({
      idFuncionario: new FormControl(''),
      nome: new FormControl('Oto veado'),
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
