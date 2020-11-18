import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { rhState } from 'src/app/rh/reducers/rh.reducer';
import { RhService } from 'src/app/rh/rh.service';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-relatorio-ferias',
  templateUrl: './relatorio-ferias.component.html',
  styleUrls: ['./relatorio-ferias.component.scss']
})
export class RelatorioFeriasComponent implements OnInit {

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
    return this.router.navigate(['/','relatorio']);
  }
}
