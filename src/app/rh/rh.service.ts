import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Funcionario } from './models/funcionario.model';
import { environment } from 'src/environments/environment';

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

   public editarFuncionario(funcionario: Funcionario){
    return this.http.put(`${environment.url}`+'funcionario/editar', funcionario, httpOptions);
 }
   public excluir(funcionario: Funcionario){
      return this.http.delete(`${environment.url}`+'funcionario/excluir/'+funcionario.idFuncionario, httpOptions)
   }
}
