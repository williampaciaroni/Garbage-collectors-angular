import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpSentEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import { catchError, delay } from "rxjs/operators";
import { TokenService } from "../token.service";
import { EMPTY } from "@angular/core/src/render3/definition";


@Injectable({
    providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor{

    isRefreshingToken: boolean=false;

    authService=this.injector.get(TokenService);

    constructor(private injector: Injector) {}
    
    addToken(req: HttpRequest<any>, token:string):HttpRequest<any> {
        return req.clone({headers: req.headers.set("Authorization",
                "Bearer "+token)
        });
    }

    intercept(req:HttpRequest<any>, next:HttpHandler) {

        const token=this.authService.getToken();
        if(token===null || req.url.search(/check_token/)!==-1){
            return next.handle(req);   
        }
        else{
            return next.handle(this.addToken(req, this.authService.getToken()));
        }
    }
 
    logoutUser(): Observable<HttpEvent<any>> {
        // Route to the login page (implementation up to you)
 
        return throwError("");
    }

    private handleRequestError(error){
        return throwError('request error');
    }
}