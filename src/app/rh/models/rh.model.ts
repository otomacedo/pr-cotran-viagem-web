import { Funcionario } from './funcionario.model';
import { Gratificacao } from './gratificacao.model';
import { Setor } from './setor.model';
import { Graduacao } from './graduacao.model';
import { Atividade } from './atividade.model';
import { Departamento } from './departamento.model';

export class Rh{
    constructor(){


    }

    idRh:number;
    funcionario: Funcionario;
    orgaoOrigem: String;
    possePr: Date;
    matriculaSiape: String;
    matriculaPr: String;
    gratificacao : Gratificacao;
    graduacao: Graduacao;
    setor :  Setor;
    atividade : Atividade;
    departamento : Departamento;
    
}