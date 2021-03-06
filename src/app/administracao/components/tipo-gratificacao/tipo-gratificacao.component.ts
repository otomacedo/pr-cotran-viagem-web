import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { RhService } from 'src/app/rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-tipo-gratificacao',
  templateUrl: './tipo-gratificacao.component.html',
  styleUrls: ['./tipo-gratificacao.component.scss']
})
export class TipoGratificacaoComponent implements OnInit {

  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
  }
  voltar(){
    return this.router.navigate(['/','administracao']);
  }
}
