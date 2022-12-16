import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AppAuthService} from "./app-auth.service";

@Injectable({
  providedIn: 'root'
})
export class CanActivateClientGuard implements CanActivate, CanActivateChild {
  constructor(private _authService : AppAuthService,
              private _router : Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var isAuthenticated = this._authService.CheckCookieClient();
    if (!isAuthenticated) {
      this._router.navigate(['']);
    }
    return isAuthenticated;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var isAuthenticated = this._authService.CheckCookieClient();
    if (!isAuthenticated) {
      this._router.navigate(['']);
    }
    return isAuthenticated;
  }

}
