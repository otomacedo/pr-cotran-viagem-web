import { Component, OnInit } from '@angular/core';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { Store } from '@ngrx/store';
import { RhService } from 'src/app/rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';
import { Atividade } from 'src/app/rh/models/atividade.model';
import { Funcionario } from 'src/app/rh/models/funcionario.model';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {

  atividade: Atividade = new Atividade();
  formAtividade: FormGroup

  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService)
    {
    this.formAtividade = this.createForm();
  }
  atividades: Atividade[];
  
  ngOnInit(): void {
    this.listarAtividades();
  }

  salvarAtividade(){
    return this.service.salvarAtividade(this.atividadeDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);
      this.listarAtividades();
      this.formAtividade.controls.descricao.setValue('');
      return this.router.navigate(['/','atividades']);
    });
  }

  voltar(){
    return this.router.navigate(['/','administracao']); 
  }

  createForm(){
    return this.fb.group({
      idAtividade: new FormControl(''),
      descricao: new FormControl('')
    })
  }

  public preencheForm(atividade:Atividade){
    this.formAtividade.controls.idAtividade.setValue(atividade.idAtividade);
    this.formAtividade.controls.descricao.setValue(atividade.descricao);
  }

  atividadeDTO(): Atividade{
    let atividadeDTO = new Atividade();

    atividadeDTO.idAtividade=this.formAtividade.controls.idAtividade.value;
    atividadeDTO.descricao= this.formAtividade.controls.descricao.value;
    
    return atividadeDTO;
  }

  listarAtividades(){
    this.service.listarAtividade().subscribe(dados =>{
      this.atividades = dados;
    })
  }

  excluirAtividade(atividade: Atividade){
    this.service.excluirAtividade(atividade).subscribe(data =>{
      this.listarAtividades()
      console.log(data)
    })
  }
}
