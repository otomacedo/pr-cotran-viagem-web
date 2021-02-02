import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { rhState } from './rh/reducers/rh.reducer';
import { RhService } from './rh/rh.service';
import { SharedService } from './Shared/shared.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pr-cotran-viagem-web';


  
  constructor(private store: Store<rhState>,
    private service: RhService,
    private shared: SharedService,
    private router : Router,
    private fb: FormBuilder)  
    {}
  home(){
    return this.router.navigate(['/','inicio'])
  }
  funcionarios(){
    return this.router.navigate(['/','funcionarios'])
  }
  administracao(){
    return this.router.navigate(['/','administracao'])
  }
  viagens(){
    return this.router.navigate(['/','inicio'])
  }
  relatorio(){
    return this.router.navigate(['/','relatorio'])
  }

  sair(){
    return this.router.navigate(['/','login'])
  }
}
