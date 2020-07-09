import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { RhService } from 'src/app/rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';
import { Graduacao } from 'src/app/rh/models/graduacao.model';

@Component({
  selector: 'app-graduacao',
  templateUrl: './graduacao.component.html',
  styleUrls: ['./graduacao.component.scss']
})
export class GraduacaoComponent implements OnInit {

  graduacao : Graduacao = new Graduacao()
  formGraduacao: FormGroup

  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) 
  {
    this.formGraduacao = this.createForm();
   }

   graduacoes : Graduacao[]
  ngOnInit(): void {
    this.listarGraduacao()
  }

  salvarGraduacao(){
    return this.service.salvarGraduacao(this.graduacaoDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);
      this.listarGraduacao();
      this.formGraduacao.controls.descricao.setValue('');
     return this.router.navigate(['/','graduacoes']);
    });
  }

  createForm(){
    return this.fb.group({
      idGraduacao: new FormControl(''),
      descricao: new FormControl('')
    })
  }

  public preencheForm(graduacao:Graduacao){
    this.formGraduacao.controls.idGraduacao.setValue(graduacao.idGraduacao);
    this.formGraduacao.controls.descricao.setValue(graduacao.descricao);
  }

  graduacaoDTO(): Graduacao{
    let graduacaoDTO = new Graduacao();

    graduacaoDTO.idGraduacao=this.formGraduacao.controls.idGraduacao.value;
    graduacaoDTO.descricao= this.formGraduacao.controls.descricao.value;
    
    return graduacaoDTO;
  }

  listarGraduacao(){
    this.service.listarGraduacao().subscribe(dados =>{
      this.graduacoes = dados;
    })
  }

  excluirGraduacao(graduacao: Graduacao){
    this.service.excluirGraduacao(graduacao).subscribe(data =>{
      this.listarGraduacao()
      console.log(data)
    })
  }

  voltar(){
    return this.router.navigate(['/','administracao']);
  }

}
