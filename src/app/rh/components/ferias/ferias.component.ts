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
import { faCheck, faClock, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  trash = faTrash;
  aguarde = faClock;

  quantidadeDias: number
  p1: boolean;
  p2: boolean;
  p3: boolean;

  editButtonUm: boolean = false;
  editButtonDois: boolean = false;
  editButtonTres: boolean = false;

  saveButtonUm: boolean = false;
  saveButtonDois: boolean = false;
  saveButtonTres: boolean = false;

  marcacaoUm: String = "";
  marcacaoDois: String = "";
  marcacaoTres: String = "";
  feriasMarcacao: FeriasMarcadas = new FeriasMarcadas()
  constructor(
    private router: Router,
    private store: Store<rhState>,
    private service: RhService,
    private fb: FormBuilder,
    private shared: SharedService) {
    this.formFerias = this.creatForm();
  }

  ngOnInit(): void {
    this.reactiveForm();
    this.consultarRh();
    this.qtdParcelas();
  }

  salvarFerias() {
    let totalDiasPeriodos =
      (+this.formFerias.controls['qtdDiasUm'].value) +
      (+this.formFerias.controls['qtdDiasDois'].value) +
      (+this.formFerias.controls['qtdDiasTres'].value)

    if (totalDiasPeriodos > 30) {
      this.shared.mensagemErro("Quantidade de dias não pode ultrapassar 30");
    } else {
      if (this.feriasMarcacao.ferias) {
        this.rh.feriasMarcadas.push(this.feriasMarcacao);
        return this.service.editarRh(this.rh).subscribe(data => {
          this.shared.mensagemSucesso("Férias marcadas com sucesso!");
          this.consultarRh()
        })
      } else
        this.shared.mensagemErro("Marcação inválida!");
    }

  }
  creatForm() {
    return this.fb.group({
      qtdDiasUm: new FormControl(''),
      inicioUm: new FormControl(''),
      fimUm: new FormControl(''),
      qtdDiasDois: new FormControl(''),
      inicioDois: new FormControl(''),
      fimDois: new FormControl(''),
      qtdDiasTres: new FormControl(''),
      inicioTres: new FormControl(''),
      fimTres: new FormControl(''),

      periodos: new FormControl('1')
    })
  }

  preencheForm(ferias: Ferias): void {
    this.formFerias.controls.id.setValue(ferias.idFerias);
    this.formFerias.controls.inicio.setValue(this.shared.formatarData(ferias.inicio));
    this.formFerias.controls.fim.setValue(this.shared.formatarData(ferias.fim));
  }

  feriasDTO(periodo) {
    let ferias: Ferias = new Ferias();
    ferias.inicio = this.formFerias.controls['inicio' + periodo].value;
    ferias.fim = this.formFerias.controls['fim' + periodo].value;
    ferias.periodo = periodo;
    return ferias;
  }

  editar(ferias: Ferias) {

  }
  excluirFerias(ferias: Ferias) {
    return this.service.excluirFerias(ferias).subscribe(data => {
      this.consultarRh()
      this.shared.mensagemSucesso(data["mensagem"]);
    })

  }

  private consultarRh() {
    this.$rh.subscribe(rh => {
      this.service.consultarRh(rh.idRh).subscribe(rh => {
        this.rh = rh;
      })
    })
  }

  voltar() {
    return this.router.navigate(['/', 'perfilFuncionario']);
  }
  calcularDiasFerias(periodo) {

    if (+this.formFerias.controls['qtdDias' + periodo].value > 30) {
      this.shared.mensagemErro("Quantidade de dias não pode ultrapassar 30");
      this.formFerias.controls['fim' + periodo].setValue('')
    }
    else {
      var d: Date = new Date(this.feriasDTO(periodo).inicio);
      d.setDate(d.getDate() + (+this.formFerias.controls['qtdDias' + periodo].value + 1))
      this.formFerias.controls['fim' + periodo].setValue(this.shared.formatarData(d))
    }
  }

  salvarMarcacao(periodo) {
    let totalDiasPeriodos =
    (+this.formFerias.controls['qtdDiasUm'].value) +
    (+this.formFerias.controls['qtdDiasDois'].value) +
    (+this.formFerias.controls['qtdDiasTres'].value)

  if (totalDiasPeriodos > 30) 
    this.shared.mensagemErro("O total de dias nos períodos não pode ultrapassar 30");
  else{
    let ferias = new Ferias();
    ferias.fim = this.formFerias.controls['fim' + periodo].value;
    ferias.inicio = this.formFerias.controls['inicio' + periodo].value;
    ferias.periodo = periodo;
    if (this.feriasMarcacao.ferias === undefined)
      this.feriasMarcacao.ferias = new Array();

    if (this.formFerias.controls['inicio' + periodo].value == '')
      this.shared.mensagemErro("Início Obrigatório!")
    else if (this.formFerias.controls['qtdDias' + periodo].value == '')
      this.shared.mensagemErro("Período Obrigatório!")
    else if (+this.formFerias.controls['qtdDias' + periodo].value > 30)
      this.shared.mensagemErro("Quantidade de dias não pode ultrapassar 30!")
    else{
      this.feriasMarcacao.dataDeMarcacao = new Date();
      this.feriasMarcacao.ferias.push(ferias);
      this.habilitarDesabilitar(periodo, false)
    }
  } 
  }

  qtdParcelas() {
    this.formFerias.controls.periodos.valueChanges.subscribe(
      v => {
        if (v == 2) {
          this.p2 = true;
          this.p3 = false;
        }
        if (v == 3) {
          this.p2 = true;
          this.p3 = true;
        }
        if (v == 1) {
          this.p2 = false;
          this.p3 = false;
        }
      }
    )
  }

  public habilitarDesabilitar(periodo, editar) {
    if (editar) {
      this.formFerias.controls['inicio' + periodo].enable();
      this.formFerias.controls['qtdDias' + periodo].enable();
      this.feriasMarcacao.ferias.filter(f => {
        let index = this.feriasMarcacao.ferias.indexOf(f);
        if (f.periodo == periodo)
          this.feriasMarcacao.ferias.splice(index, 1);
      });
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
      console.log(this.feriasMarcacao.ferias)
    } else {
      if (this.formFerias.controls['inicio' + periodo].value == '')
        this.shared.mensagemErro("Início Obrigatório!")
      else if (this.formFerias.controls['qtdDias' + periodo].value == '')
        this.shared.mensagemErro("Período Obrigatório!")
      else {
        this.formFerias.controls['inicio' + periodo].disable();
        this.formFerias.controls['qtdDias' + periodo].disable();

        if (periodo == "Um") {
          this.marcacaoUm = 'active';
        }
        if (periodo == "Dois") {
          this.marcacaoDois = 'active';
        }

        if (periodo == "Tres") {
          this.marcacaoTres = 'active';
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
  private reactiveForm() {
    this.formFerias.controls['qtdDiasUm'].valueChanges.subscribe(v => {
      this.calcularDiasFerias("Um");
    })

    this.formFerias.controls['qtdDiasDois'].valueChanges.subscribe(v => {
      this.calcularDiasFerias("Dois");
    })

    this.formFerias.controls['qtdDiasTres'].valueChanges.subscribe(v => {
      this.calcularDiasFerias("Tres");
    })

    this.formFerias.controls['inicioUm'].valueChanges.subscribe(i => {
      if (!i)
        this.formFerias.controls['qtdDiasUm'].disable()
      else
        this.formFerias.controls['qtdDiasUm'].enable()
    })

    this.formFerias.controls['inicioDois'].valueChanges.subscribe(i => {
      if (!i)
        this.formFerias.controls['qtdDiasDois'].disable()
      else
        this.formFerias.controls['qtdDiasDois'].enable()
    })

    this.formFerias.controls['inicioTres'].valueChanges.subscribe(i => {
      if (!i)
        this.formFerias.controls['qtdDiasTres'].disable()
      else
        this.formFerias.controls['qtdDiasTres'].enable()
    })
  }

}
