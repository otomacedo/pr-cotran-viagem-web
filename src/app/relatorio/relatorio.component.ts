import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarAlt, faChartPie, faCogs, faPlaneDeparture, faUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { rhState } from '../rh/reducers/rh.reducer';
import { RhService } from '../rh/rh.service';
import { SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  constructor(
    private store: Store<rhState>,
    private service: RhService,
    private router:Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) { }
  facalendarAlt = faCalendarAlt;
  faCogs = faCogs;
  faPlane = faPlaneDeparture
  chart = faChartPie

  ngOnInit(): void {
  }
  voltar(){
    return this.router.navigate(['/','inicio']);
  }
  relatorioFerias(){
    return this.router.navigate(['/','relatorio-ferias']);
  }
}
