import { ToastrService } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';

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

    formatarDataBR(data: Date): string{
        return this.d.transform(data,"dd-MM-yyyy");
    }

   /**
     * Verifica se o campo do formulário é válido
     * @param form
     * @param formControlName
     * @author romario.portela
     */
    isFormValid(form:FormGroup, formControlName?:string) : Boolean{
        Object.keys(form.controls).forEach(valor=>
            form.controls[valor].markAsTouched()
           )
        return form.controls[formControlName].valid
    }
    }
