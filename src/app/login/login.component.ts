import { Component, OnInit } from '@angular/core';
import { RhService } from '../rh/rh.service';
import { Store } from '@ngrx/store';
import { rhState } from '../rh/reducers/rh.reducer';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: RhService, private store: Store<rhState>, private router: Router) { }
  formLogin : FormGroup;
  ngOnInit(): void {
  }

  entrar(){
    
    return this.router.navigate(['/','inicio']);
  }
  sair(){
    
    return this.router.navigate(['/','login']);
  }
}
