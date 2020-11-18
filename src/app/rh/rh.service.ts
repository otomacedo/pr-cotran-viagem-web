import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Funcionario } from './models/funcionario.model';
import { environment } from 'src/environments/environment';
import { Atividade } from './models/atividade.model';
import { Departamento } from './models/departamento.model';
import { Setor } from './models/setor.model';
import { Graduacao } from './models/graduacao.model';
import { Gratificacao } from './models/gratificacao.model';
import { Rh } from './models/rh.model';
import { Ferias } from './models/ferias.model';
import { filtro } from './models/filtro.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RhService {
  
   constructor(private http: HttpClient ){
     
   }

   public listarFuncionarios() {
     return this.http.get<Funcionario[]>(environment.url+'funcionario/listar');
   }

   public cadastrarFuncionario(funcionario: Funcionario){
      return this.http.post(`${environment.url}`+'funcionario/salvar', funcionario, httpOptions);
   }

   public salvarAtividade(atividade: Atividade){
      return this.http.post(`${environment.url}`+'administracao/salvarAtividade',atividade,httpOptions);
   }

   public salvarGratificacao(gratificacao: Gratificacao){
      return this.http.post(`${environment.url}`+'administracao/salvarGratificacao',gratificacao,httpOptions);
   }

   public salvarRh(rh:Rh){
      return this.http.post(`${environment.url}`+'rh/salvarRh',rh,httpOptions);
   }  

   public salvarDepartamento(departamento: Departamento){
      return this.http.post(`${environment.url}`+'administracao/salvarDepartamento',departamento,httpOptions);
   }

   public salvarGraduacao(graduacao: Graduacao){
      return this.http.post(`${environment.url}`+'administracao/salvarGraduacao',graduacao,httpOptions);
   }
   
   public salvarSetor(setor: Setor){
      return this.http.post(`${environment.url}`+'administracao/salvarSetor',setor,httpOptions)
   }

   public editarFuncionario(funcionario: Funcionario){
    return this.http.put(`${environment.url}`+'funcionario/editar', funcionario, httpOptions);
   }
   public atualizarStatusFuncionario(funcionario: Funcionario){
      return this.http.put(`${environment.url}`+'funcionario/atualizarStatus', funcionario, httpOptions);
   }
   public excluirRh(rh: Rh){
      return this.http.delete(`${environment.url}`+'rh/excluirRh/'+rh.idRh,httpOptions);
   }

   public excluir(funcionario: Funcionario){
      return this.http.delete(`${environment.url}`+'funcionario/excluir/'+funcionario.idFuncionario, httpOptions)
   }

   public excluirAtividade(atividade: Atividade){
      return this.http.delete(`${environment.url}`+'administracao/excluirAtividade/'+atividade.idAtividade, httpOptions)
   }

   public excluirDepartamento(departamento: Departamento){
      return this.http.delete(`${environment.url}`+'administracao/excluirDepartamento/'+departamento.idDepartamento, httpOptions)
   }

   public excluirSetor(setor: Setor){
      return this.http.delete(`${environment.url}`+'administracao/excluirSetor/'+setor.idSetor, httpOptions)
   }

   public excluirGratificacao(gratificacao: Gratificacao){
      return this.http.delete(`${environment.url}`+'administracao/excluirGratificacao/'+gratificacao.idGratificacao,httpOptions);
   }

   public excluirGraduacao(graduacao: Graduacao){
      return this.http.delete(`${environment.url}`+'administracao/excluirGraduacao/'+graduacao.idGraduacao, httpOptions)
   }

   public listarAtividade(){
      return this.http.get<Atividade[]>(environment.url+'administracao/listarAtividade', httpOptions);
   }

   public listarDepartamento(){
      return this.http.get<Departamento[]>(environment.url+'administracao/listarDepartamento',httpOptions)
   }

   public listarFuncionariosAtivos(){
      return this.http.get<Funcionario[]>(environment.url+'funcionario/listarAtivos',httpOptions);
   }

   public listarFuncionariosInativos(){
      return this.http.get<Funcionario[]>(environment.url+'funcionario/listarInativos',httpOptions);
   }
   public listarSetor(){
      return this.http.get<Setor[]>(environment.url+'administracao/listarSetor', httpOptions)
   }

   public listarGraduacao(){
      return this.http.get<Graduacao[]>(environment.url+'administracao/listarGraduacao', httpOptions)
   }

   public listarGratificacao(){
      return this.http.get<Gratificacao[]>(environment.url+'administracao/listarGratificacao',httpOptions)
   }
   public listarTercerizados(){
      return this.http.get<Rh[]>(environment.url+'rh/listarTercerizados',httpOptions)
   }
   public editarRh(rh: Rh){
      return this.http.put<Rh>(`${environment.url}`+'rh/editarRh',rh,httpOptions);
   }

   public consultarPorFuncionario(id){
      return this.http.get<Rh>(environment.url+'rh/consultarRhPorFuncionario/'+id,httpOptions)
   }

   public excluirFerias(ferias: Ferias){
      return this.http.delete(`${environment.url}`+'rh/excluirFerias/'+ferias.idFerias, httpOptions)
   }

   public consultarRh(id){
      return this.http.get<Rh>(environment.url+'rh/consultarRh/'+id,httpOptions)
   }

   public filtrarFuncionarios(filtro: filtro){
      return this.http.get<Funcionario[]>(environment.url+'funcionario/filtrar/'+filtro.tipo+'/'+filtro.valor,httpOptions);
   }
}
