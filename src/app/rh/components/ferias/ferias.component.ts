import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { rhState, selectRh } from '../../reducers/rh.reducer';
import { RhService } from '../../rh.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Shared/shared.service';
import { Rh } from '../../models/rh.model';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Ferias } from '../../models/ferias.model';
import { Observable } from 'rxjs';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.scss']
})
export class FeriasComponent implements OnInit {

  formFerias: FormGroup;
  rh: Rh = new Rh();
  $rh: Observable<Rh> = this.store.pipe(select(selectRh));
  check = faCheck;
  p1 : boolean;
  p2 : boolean;
  p3 : boolean;
  marcacao :  String = ""
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
    this.qtdParcelas();
  }

//  salvarFerias(){
//    if(this.formFerias.valid){
//    this.rh.feriasMarcadas.push(this.feriasDTO());
//   return this.service.editarRh(this.rh).subscribe(data=>{
//    this.shared.mensagemSucesso("Férias marcadas com sucesso!");
//    this.consultarRh()
//   })
//  }else
//  this.shared.mensagemErro("Formulário contém erros!");
//  }
  creatForm(){
    return this.fb.group ({
      qtdDias: new FormControl(''),
      idFerias: new FormControl(''),
      inicio : new FormControl('', Validators.required),
      fim: new FormControl(''),
      periodos: new FormControl('1')   
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

  salvarMarcacao(){
    this.marcacao = '';
    this.p2=true;
  }

  qtdParcelas(){
      this.formFerias.controls.periodos.valueChanges.subscribe(
        v=>{
          if(v==2){
            //this.p2=true;
            this.p3= false;
          }
          if(v==3){
            this.p2= true;
            this.p3= true;
          }
          if(v==1){
            this.p2=false;
            this.p3=false;
          }
        }
      )
  }
}
