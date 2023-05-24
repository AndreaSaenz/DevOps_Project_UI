import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { UserServicesService } from '../../services/user/user-services.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor {

  constructor(private authService: UserServicesService) { }

  intercept(req: any, next: any) {
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }

}
