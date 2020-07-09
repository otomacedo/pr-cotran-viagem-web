import { Injectable, NgModule } from "@angular/core";
import {
     HttpInterceptor, 
     HttpRequest, 
     HttpHandler, 
     HttpEvent, 
     HTTP_INTERCEPTORS 
    } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { finalize } from "rxjs/operators";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor{

    @BlockUI() blockUI: NgBlockUI;
    constructor(){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        switch(req.method){
            case 'POST' : 
                this.blockUI.start("Salvando");
                break;
            case 'GET'  :
                this.blockUI.start("Listando");
                break;
            case 'PUT' :
                this.blockUI.start("Atualizando");
                break;
            case 'DELETE' : 
                this.blockUI.start("Excluindo");
                break;
            default:
                this.blockUI.start("Carregando");
        }
         return next.handle(req).pipe(finalize(()=>{
            this.blockUI.stop();
         }))
    }
}
@NgModule({
    providers:[
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestInterceptor,
            multi:true
        }
    ]
    }
)
export class Interceptor{}