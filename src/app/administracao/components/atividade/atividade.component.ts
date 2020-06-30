import { Component, OnInit } from '@angular/core';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { Store } from '@ngrx/store';
import { RhService } from 'src/app/rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {

  formSetor: FormGroup

  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) {
  }

  ngOnInit(): void {
  }

  salvarAtividade(){


  }

  voltar(){
    return this.router.navigate(['/','administracao']); 
  }
}
