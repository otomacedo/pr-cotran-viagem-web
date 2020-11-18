import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faCogs, faPlane, faPlaneArrival, faPlaneDeparture, faChartArea, faChartPie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  faUser = faUser;
  faCogs = faCogs;
  faPlane = faPlaneDeparture
  chart = faChartPie
  public funcionarios(){
    return this.router.navigate(['/','funcionarios'])
  }
  administracao(){
    return this.router.navigate(['/','administracao'])
  }

  viagem(){
    return this.router.navigate(['/','administracao'])
  }
  relatorio(){
    return this.router.navigate(['/','relatorio'])
  }
  ngOnInit(): void {
  }
}
