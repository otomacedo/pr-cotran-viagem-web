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
import * as fromRh from 'src/app/rh/reducers/rh.reducer'

@NgModule({
  declarations: [
    AppComponent,
    RhComponent,
    ViagensComponent,
    FeriasComponent,
    CadastrarFuncionarioComponent,
    ListarFuncionariosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    Interceptor,
    BlockUIModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('rh', fromRh.reducer)
  ],
  providers: [RhService],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
