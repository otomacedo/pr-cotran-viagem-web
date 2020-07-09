import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { RhService } from 'src/app/rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';
import { Departamento } from 'src/app/rh/models/departamento.model';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  departamento: Departamento = new Departamento();
  formDepartamento: FormGroup

  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) 
  {
    this.formDepartamento = this.createForm();
   }
  departamentos: Departamento[];

  ngOnInit(): void {
    this.listarDepartamentos();
  }
  salvarDepartamento(){
    return this.service.salvarDepartamento(this.departamentoDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);
      this.listarDepartamentos();
      this.formDepartamento.controls.descricao.setValue('');
     return this.router.navigate(['/','departamentos']);
    });
  }
  createForm(){
    return this.fb.group({
      idDepartamento: new FormControl(''),
      descricao: new FormControl('')
    })
  }

  public preencheForm(departamento:Departamento){
    this.formDepartamento.controls.idDepartamento.setValue(departamento.idDepartamento);
    this.formDepartamento.controls.descricao.setValue(departamento.descricao);
  }

  departamentoDTO(): Departamento{
    let departamentoDTO = new Departamento();

    departamentoDTO.idDepartamento=this.formDepartamento.controls.idDepartamento.value;
    departamentoDTO.descricao= this.formDepartamento.controls.descricao.value;
    
    return departamentoDTO;
  }

  listarDepartamentos(){
    this.service.listarDepartamento().subscribe(dados =>{
      this.departamentos = dados;
    })
  }
  
  excluirDepartamento(departamento: Departamento){
    this.service.excluirDepartamento(departamento).subscribe(data =>{
      this.listarDepartamentos()
      console.log(data)
    })
  }

  voltar(){
    return this.router.navigate(['/','administracao']);
  }
}
