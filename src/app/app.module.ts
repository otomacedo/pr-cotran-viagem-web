import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RhComponent } from './rh/rh.component';
import { ViagensComponent } from './viagens/viagens.component';
import { FeriasComponent } from './rh/components/ferias/ferias.component';
import { RhService } from './rh/rh.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Interceptor } from './interceptor/interceptor.module';
import { CadastrarFuncionarioComponent } from './rh/components/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { ListarFuncionariosComponent } from './rh/components/funcionario/listar-funcionarios/listar-funcionarios.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import * as fromRh from 'src/app/rh/reducers/rh.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { SharedService } from './Shared/shared.service';
import { DatePipe } from '@angular/common';
import { AdministracaoComponent } from './administracao/administracao.component';
import { GerenciarFuncionarioComponent } from './rh/components/gerenciar-funcionario/gerenciar-funcionario.component';
import { AtividadeComponent } from './administracao/components/atividade/atividade.component';
import { DepartamentoComponent } from './administracao/components/departamento/departamento.component';
import { SetorComponent } from './administracao/components/setor/setor.component';
import { GraduacaoComponent } from './administracao/components/graduacao/graduacao.component';
import { GratificacaoComponent } from './administracao/components/gratificacao/gratificacao.component';
import { TipoGratificacaoComponent } from './administracao/components/tipo-gratificacao/tipo-gratificacao.component';
@NgModule({
  declarations: [
    AppComponent,
    RhComponent,
    ViagensComponent,
    FeriasComponent,
    CadastrarFuncionarioComponent,
    ListarFuncionariosComponent,
    HomeComponent,
    AdministracaoComponent,
    GerenciarFuncionarioComponent,
    AtividadeComponent,
    DepartamentoComponent,
    SetorComponent,
    GraduacaoComponent,
    GratificacaoComponent,
    TipoGratificacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BlockUIModule.forRoot(),
    Interceptor,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedService,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('rh', fromRh.reducer)
  ],
  providers: [RhService, DatePipe],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
