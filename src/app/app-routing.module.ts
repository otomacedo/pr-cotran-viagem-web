import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarFuncionariosComponent } from './rh/components/funcionario/listar-funcionarios/listar-funcionarios.component';
import { CadastrarFuncionarioComponent } from './rh/components/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { HomeComponent } from './home/home.component';
import { AdministracaoComponent } from './administracao/administracao.component';
import { GerenciarFuncionarioComponent } from './rh/components/gerenciar-funcionario/gerenciar-funcionario.component';
import { AtividadeComponent } from './administracao/components/atividade/atividade.component';
import { DepartamentoComponent } from './administracao/components/departamento/departamento.component';
import { SetorComponent } from './administracao/components/setor/setor.component';
import { GratificacaoComponent } from './administracao/components/gratificacao/gratificacao.component';
import { TipoGratificacaoComponent } from './administracao/components/tipo-gratificacao/tipo-gratificacao.component';
import { GraduacaoComponent } from './administracao/components/graduacao/graduacao.component';
import { PerfilFuncionarioComponent } from './rh/components/perfil-funcionario/perfil-funcionario.component';
import { FeriasComponent } from './rh/components/ferias/ferias.component';
import { LoginComponent } from './login/login.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioFeriasComponent } from './relatorio/relatorio-ferias/relatorio-ferias.component';

const routes: Routes = [
  {path: 'funcionarios', component: ListarFuncionariosComponent},
  {path: 'cadastrarFuncionario', component: CadastrarFuncionarioComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'administracao', component: AdministracaoComponent},
  {path: 'gerenciarFuncionario', component:GerenciarFuncionarioComponent},
  {path: 'atividade', component: AtividadeComponent},
  {path: 'departamento',component: DepartamentoComponent},
  {path: 'setor', component: SetorComponent},
  {path: 'gratificacao', component: GratificacaoComponent},
  {path: 'tipoGratificacao',component: TipoGratificacaoComponent},
  {path: 'graduacao', component: GraduacaoComponent},
  {path: 'perfilFuncionario', component: PerfilFuncionarioComponent},
  {path: 'ferias',component: FeriasComponent},
  {path: 'login', component: LoginComponent},
  {path: 'relatorio', component: RelatorioComponent},
  {path: 'relatorio-ferias', component: RelatorioFeriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
