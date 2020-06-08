import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionarioComponent } from './rh/funcionario/funcionario.component';
import { ListarFuncionariosComponent } from './rh/funcionario/listar-funcionarios/listar-funcionarios.component';
import { CadastrarFuncionarioComponent } from './rh/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'funcionarios', component: ListarFuncionariosComponent},
  {path: 'cadastrarFuncionario', component: CadastrarFuncionarioComponent},
  {path: 'inicio', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
