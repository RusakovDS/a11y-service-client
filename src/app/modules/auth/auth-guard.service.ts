import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthQuery} from './state';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authQuery: AuthQuery,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // For sync storage
    return this.authQuery.isLogin$.pipe(
      map(isAuth => {
        if (isAuth) {
          return true;
        }
        this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url}});
        return false;
      }),
    );
  }

}
