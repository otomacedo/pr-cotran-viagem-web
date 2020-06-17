import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { rhState } from '../rh/reducers/rh.reducer';
import { RhService } from '../rh/rh.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.scss']
})
export class AdministracaoComponent implements OnInit {

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
}
