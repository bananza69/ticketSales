import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    let hasToken = this.userService.getToken();
    const userToken = window.localStorage.getItem("userToken");
    const authUser = <string>window.localStorage.getItem("authUser");
    let finalToken = hasToken || userToken;

    if (finalToken) {

      if (!hasToken) {
        this.userService.setToken(finalToken);
        // this.userService.setUser(<IUser>JSON.parse(authUser));
      }

      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + finalToken)
      });
      return next.handle(cloned);

    } else {

      return next.handle(req);

    }
  }
}

