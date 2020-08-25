import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { rhState, selectRh } from '../../reducers/rh.reducer';
import { RhService } from '../../rh.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';
import { Rh } from '../../models/rh.model';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Ferias } from '../../models/ferias.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.scss']
})
export class FeriasComponent implements OnInit {

  formFerias: FormGroup;
  rh: Rh = new Rh();
  $rh: Observable<Rh> = this.store.pipe(select(selectRh));

  constructor(
    private router: Router,
    private store: Store<rhState>,
    private service: RhService,
    private fb: FormBuilder,
    private shared: SharedService) 
  {
    this.formFerias= this.creatForm();
   }

  ngOnInit(): void {
    this.calcularDiasFerias();
    this.consultarRh();
  }

  salvarFerias(){
    this.rh.ferias.push(this.feriasDTO());
   return this.service.editarRh(this.rh).subscribe(data=>{
    this.shared.mensagemSucesso("Férias marcadas com sucesso!");
    this.consultarRh()
   })
  }
  creatForm(){
    return this.fb.group ({
      qtdDias: new FormControl(''),
      idFerias: new FormControl(''),
      inicio : new FormControl(''),
      fim: new FormControl('')   
    })
  }

  preencheForm(ferias: Ferias): void{
    this.formFerias.controls.id.setValue(ferias.idFerias);
    this.formFerias.controls.inicio.setValue(this.shared.formatarData(ferias.inicio));
    this.formFerias.controls.fim.setValue(this.shared.formatarData(ferias.fim));
  }

  feriasDTO (){
    let ferias: Ferias= new Ferias();
    ferias.inicio= this.formFerias.controls.inicio.value;
    ferias.fim=this.formFerias.controls.fim.value;

    return ferias;
  }

  editar(ferias: Ferias){

  }
  excluirFerias(ferias: Ferias){
    return this.service.excluirFerias(ferias).subscribe(data=>{
      this.consultarRh()
      this.shared.mensagemSucesso(data["mensagem"]);
     })

  }

  private consultarRh(){
    this.$rh.subscribe(rh=>{
      this.service.consultarRh(rh.idRh).subscribe(rh=>{
        this.rh = rh;
      })
    })
  }

  voltar(){
    return this.router.navigate(['/','perfilFuncionario']);
  }
  calcularDiasFerias(){
    this.formFerias.controls.qtdDias.valueChanges.subscribe(v=>{
      var d: Date = new Date(this.feriasDTO().inicio);
      d.setDate(d.getDate() + (+this.formFerias.controls.qtdDias.value + 1))
      this.formFerias.controls.fim.setValue(this.shared.formatarData(d))
    })
  }
}
