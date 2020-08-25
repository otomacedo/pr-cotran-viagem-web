import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { rhState } from '../rh/reducers/rh.reducer';
import { RhService } from '../rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../Shared/shared.service';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.scss']
})
export class AdministracaoComponent implements OnInit {
  faCogs = faCogs;
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
    return this.router.navigate(['/','inicio']);
  }
  gratificacao(){
    return this.router.navigate(['/','gratificacao'])
  }
  setor(){
    return this.router.navigate(['/','setor'])
  }
  departamento(){
    return this.router.navigate(['/','departamento'])
  }
  atividade(){
    return this.router.navigate(['/','atividade'])
  }
  tipoGratificacao(){
    return this.router.navigate(['/','tipoGratificacao'])
  }
  graduacao(){
    return this.router.navigate(['/','graduacao'])
  }

}
