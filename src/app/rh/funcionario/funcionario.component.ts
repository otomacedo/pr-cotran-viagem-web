import { Component, OnInit } from '@angular/core';
import { RhService } from '../rh.service';
import { Funcionario } from '../models/funcionario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}
