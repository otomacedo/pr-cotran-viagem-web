import { Injectable, NgModule } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{

    @BlockUI() blockUI: NgBlockUI
    constructor(){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.blockUI.start("Carregando");
        return next.handle(req).pipe();
    }
}
@NgModule({
    providers:[
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi:true
        }
    ]
})
export class Interceptor{}