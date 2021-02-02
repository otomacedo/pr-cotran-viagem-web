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
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FeriasMarcadas } from '../../models/feriasMarcadas.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.scss']
})
export class FeriasComponent implements OnInit {

  formFerias: FormGroup;
  rh: Rh = new Rh();
  $rh: Observable<Rh> = this.store.pipe(select(selectRh));
  @BlockUI() blockUI: NgBlockUI;
  check = faCheck;
  edit = faEdit;

  p1 : boolean;
  p2 : boolean;
  p3 : boolean;

  editButtonUm: boolean = false;
  editButtonDois: boolean = false;
  editButtonTres: boolean = false;

  saveButtonUm: boolean = false;
  saveButtonDois: boolean = false;
  saveButtonTres: boolean = false;

  marcacaoUm :  String = "";
  marcacaoDois : String = "";
  marcacaoTres : String = "";
  feriasMarcacao: FeriasMarcadas = new FeriasMarcadas()
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
    this.formFerias.controls['qtdDiasUm'].valueChanges.subscribe(v=>{
      this.calcularDiasFerias("Um");
    })

    this.formFerias.controls['qtdDiasDois'].valueChanges.subscribe(v=>{
      this.calcularDiasFerias("Dois");
    })

    this.formFerias.controls['qtdDiasTres'].valueChanges.subscribe(v=>{
      this.calcularDiasFerias("Tres");
    })
    this.consultarRh();
    this.qtdParcelas();
  }

  salvarFerias(){
    if(this.formFerias.valid){
    this.rh.feriasMarcadas.push(this.feriasMarcacao);
    return this.service.editarRh(this.rh).subscribe(data=>{
    this.shared.mensagemSucesso("Férias marcadas com sucesso!");
    this.consultarRh()
    })
  }else
  this.shared.mensagemErro("Formulário contém erros!");
  }
  creatForm(){
    return this.fb.group ({
      qtdDiasUm: new FormControl('', Validators.required),
      inicioUm : new FormControl('', Validators.required),
      fimUm: new FormControl(''),
      qtdDiasDois: new FormControl('', Validators.required),
      inicioDois : new FormControl('', Validators.required),
      fimDois: new FormControl(''),
      qtdDiasTres: new FormControl('', Validators.required),
      inicioTres : new FormControl('', Validators.required),
      fimTres: new FormControl(''),
      
      periodos: new FormControl('1')   
    })
  }

  preencheForm(ferias: Ferias): void{
    this.formFerias.controls.id.setValue(ferias.idFerias);
    this.formFerias.controls.inicio.setValue(this.shared.formatarData(ferias.inicio));
    this.formFerias.controls.fim.setValue(this.shared.formatarData(ferias.fim));
  }

  feriasDTO (periodo){
    let ferias: Ferias= new Ferias();
    ferias.inicio= this.formFerias.controls['inicio'+periodo].value;
    ferias.fim=this.formFerias.controls['fim'+periodo].value;

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
  calcularDiasFerias(periodo){
      var d: Date = new Date(this.feriasDTO(periodo).inicio);
      d.setDate(d.getDate() + (+this.formFerias.controls['qtdDias'+periodo].value + 1))
      this.formFerias.controls['fim'+periodo].setValue(this.shared.formatarData(d))
  }

  salvarMarcacao(periodo){
    this.blockUI.start("Aguarde")
    let ferias = new Ferias();
    ferias.fim = this.formFerias.controls['fim'+periodo].value;
    ferias.inicio = this.formFerias.controls['inicio'+periodo].value;
    if(this.feriasMarcacao.ferias === undefined)
      this.feriasMarcacao.ferias = new Array();
    
    if(periodo === 'Dois'){
      if(this.feriasMarcacao.ferias.length == 2){
        let f = this.feriasMarcacao.ferias[1];
        this.feriasMarcacao.ferias.splice(1,1);
        this.feriasMarcacao.ferias .push(ferias);
        this.feriasMarcacao.ferias .push(f);
      }else{
        this.feriasMarcacao.ferias .push(ferias);
      }
    }else{
      this.feriasMarcacao.ferias .push(ferias);
    }
    this.habilitarDesabilitar(periodo,false)
    setTimeout(_=>{
      this.blockUI.stop();},300)
  }

  qtdParcelas(){
      this.formFerias.controls.periodos.valueChanges.subscribe(
        v=>{
          if(v==2){
            this.p2=true;
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

  public habilitarDesabilitar(periodo,editar){
    if(editar){
      this.formFerias.controls['inicio'+periodo].enable();
      this.formFerias.controls['qtdDias'+periodo].enable();

      if(periodo == "Um"){
        this.marcacaoUm = '';
        this.feriasMarcacao.ferias.splice(0,1);
        console.log(this.feriasMarcacao.ferias)
      }

      if (periodo == "Dois"){
        this.marcacaoDois = '';
        this.feriasMarcacao.ferias.splice(1,1);
        console.log(this.feriasMarcacao.ferias)
      }


      if (periodo == "Tres"){
        this.marcacaoTres = '';
        this.feriasMarcacao.ferias.splice(2,1);
        console.log(this.feriasMarcacao.ferias)
      }
         

          switch (periodo) {
            case 'Um':
              this.editButtonUm = false
              break;
            case 'Dois':
              this.editButtonDois = false
              break;
            case 'Tres':
              this.editButtonTres = false
              break;
            default:
              break;
          }

    }else{
      if(this.formFerias.controls['inicio'+periodo].value == '')
        this.shared.mensagemErro("Início Obrigatório!")
      else if(this.formFerias.controls['qtdDias'+periodo].value == '')
        this.shared.mensagemErro("Período Obrigatório!")
      else{
        this.formFerias.controls['inicio'+periodo].disable();
        this.formFerias.controls['qtdDias'+periodo].disable();
  
        if(periodo == "Um"){
          this.marcacaoUm = 'active';
          console.log(this.feriasMarcacao.ferias)
        }
        
        if (periodo =="Dois"){
          this.marcacaoDois = 'active';
          console.log(this.feriasMarcacao.ferias)
        }
          
        if (periodo == "Tres"){
          this.marcacaoTres = 'active';
          console.log(this.feriasMarcacao.ferias)
        }
        
  
          switch (periodo) {
            case 'Um':
              this.editButtonUm = true
              break;
            case 'Dois':
              this.editButtonDois = true
              break;
            case 'Tres':
              this.editButtonTres = true
              break;
            default:
              break;
          }
          this.shared.mensagemSucesso("Período validado")
      }
      
    }

    
  }

}
