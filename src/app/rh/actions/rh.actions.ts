import { Funcionario } from '../models/funcionario.model';
import { Action } from '@ngrx/store';
import { Rh } from '../models/rh.model';

export enum RhActionTypes{
    AddFuncionario = '[Rh] Adcionar Funcionario',
    ModoTela = '[Rh] Editar ou Salvar',

}

export class AddFuncionario implements Action{
    readonly type = RhActionTypes.AddFuncionario;
    constructor(public rh:Rh){}
}

export class ModoTela implements Action{
    readonly type = RhActionTypes.ModoTela;
    constructor(public modo:String){}
}

export type RhAction = 
AddFuncionario | 
ModoTela