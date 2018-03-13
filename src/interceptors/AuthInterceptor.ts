import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler,
    HttpEvent, HttpErrorResponse
} from '@angular/common/http'
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../services/auth.srv';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private alertCtl: AlertController, private authService: AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        console.log('in AuthInterceptor');
        var self = this;
        return next.handle(req).do(event => { }, err => {
            if (err instanceof HttpErrorResponse && err.status == 401) {
                let alert = this.alertCtl.create({
                    title: '登录超时',
                    subTitle: '身份认证信息已过期，请重新登录。',
                    buttons: [
                        {
                            text:'确定',
                            handler: () => {
                                 self.authService.getInterceptedSource().next(err.status);
                            }
                        }
                    ]
                });
                alert.present();
            }
        });
    }
}