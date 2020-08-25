import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { RhService } from 'src/app/rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';
import { Gratificacao } from 'src/app/rh/models/gratificacao.model';

@Component({
  selector: 'app-gratificacao',
  templateUrl: './gratificacao.component.html',
  styleUrls: ['./gratificacao.component.scss']
})
export class GratificacaoComponent implements OnInit {

  gratificacao: Gratificacao = new Gratificacao();
  formGratificacao : FormGroup;

  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) 
  { 
    this.formGratificacao = this.createForm();
  }
  gratificacoes : Gratificacao[]
  p: number = 1;

  ngOnInit(): void {
    this.listarGratificacao();
  }

  salvarGratificacao(){
    return this.service.salvarGratificacao(this.gratificacaoDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);
      this.listarGratificacao();
      this.formGratificacao.controls.descricao.setValue('');
      return this.router.navigate(['/','gratificacoes']);
    });
  }
  createForm(){
    return this.fb.group({
      idGratificacao: new FormControl(''),
      descricao: new FormControl('')
    })
  }

  public preencheForm(gratificacao: Gratificacao){
    this.formGratificacao.controls.idGratificacao.setValue(gratificacao.idGratificacao);
    this.formGratificacao.controls.descricao.setValue(gratificacao.descricao);
  }

  gratificacaoDTO(): Gratificacao{
    let gratificacaoDTO = new Gratificacao();

    gratificacaoDTO.idGratificacao=this.formGratificacao.controls.idGratificacao.value;
    gratificacaoDTO.descricao= this.formGratificacao.controls.descricao.value;
    
    return gratificacaoDTO;
  }

  listarGratificacao(){
    this.service.listarGratificacao().subscribe(dados =>{
      this.gratificacoes = dados;
    })
  }

  excluirGratificacao(gratificacao: Gratificacao){
    this.service.excluirGratificacao(gratificacao).subscribe(data=>{
      this.listarGratificacao()
      console.log(data);
    })

  }

  voltar(){
    return this.router.navigate(['/','administracao']);
  }
}
