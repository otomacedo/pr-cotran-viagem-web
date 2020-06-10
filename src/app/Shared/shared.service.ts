import { ToastrService } from 'ngx-toastr';
import { NgModule } from '@angular/core';

@NgModule()
export class SharedService{
    constructor(private toastr: ToastrService){

    }
    public mensagemSucesso(mensagem: string, titulo?: string){
        this.toastr.success(titulo,mensagem)
    }
    mensagemErro(){

    }
    mensagemAlerta(){

    }
    mensagemInfo(){
        
    }
}
