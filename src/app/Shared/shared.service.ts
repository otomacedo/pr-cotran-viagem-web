import { ToastrService } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

@NgModule()
export class SharedService{
    constructor(private toastr: ToastrService, private d: DatePipe){

    }
    public mensagemSucesso(mensagem: string, titulo?: string){
        this.toastr.success(mensagem,titulo);
    }
    mensagemErro(mensagem: string, titulo?: string){
        this.toastr.error(mensagem,titulo);

    }
    mensagemAlerta(mensagem: string, titulo?: string){
        this.toastr.warning(mensagem,titulo)
    }
    mensagemInfo(mensagem:string, titulo?: string){
        this.toastr.info(mensagem,titulo);
        }
    formatarData(data: Date): string{
        return this.d.transform(data,"yyyy-MM-dd");
    }

    }
