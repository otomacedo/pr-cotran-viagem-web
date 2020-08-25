import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { RhService } from 'src/app/rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';
import { Setor } from 'src/app/rh/models/setor.model';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.scss']
})
export class SetorComponent implements OnInit {

  setor: Setor = new Setor();
  formSetor: FormGroup;

  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) 
  {
    this.formSetor = this.createForm();
   }
   setores: Setor[];
   p: number = 1;

   ngOnInit(): void {
     this.listarSetor();
  }
  salvarSetor(){
    return this.service.salvarSetor(this.setorDTO()).subscribe(data=>{
      this.shared.mensagemSucesso(data["mensagem"]);
      this.listarSetor();
      this.formSetor.controls.descricao.setValue('');
      return this.router.navigate(['/','setores']);
    });
  }
  createForm(){
    return this.fb.group({
      idSetor: new FormControl(''),
      descricao: new FormControl('')
    })
  }

  public preencheForm(setor: Setor){
    this.formSetor.controls.idSetor.setValue(setor.idSetor);
    this.formSetor.controls.descricao.setValue(setor.descricao);
  }

  setorDTO(): Setor{
    let setorDTO = new Setor();

    setorDTO.idSetor=this.formSetor.controls.idSetor.value;
    setorDTO.descricao= this.formSetor.controls.descricao.value;
    
    return setorDTO;
  }

  listarSetor(){
    this.service.listarSetor().subscribe(dados =>{
      this.setores = dados;
    })
  }

  excluirSetor(setor: Setor){
    this.service.excluirSetor(setor).subscribe(data=>{
      this.listarSetor()
      console.log(data);
    })
  }

  voltar(){
    return this.router.navigate(['/','administracao']);
  }
}
