import {AuthStore} from './state';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {resetStores} from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authStore: AuthStore,
    private apiService: ApiService,
    public router: Router
  ) {
  }

  register(registerValues) {
    return this.apiService.post(`/auth/register`, registerValues);
  }

  login(loginValues) {
    return this.apiService.post('auth/login', loginValues)
      .pipe(tap(res => {
        if (res) {
          this.authStore.update(res);
        }
        return res;
      }));
  }

  logout() {
    resetStores();
    this.router.navigate(['auth/login']);
  }

  refreshToken() {
    const refreshToken = this.authStore.getValue().refreshToken;
    return this.apiService.post('auth/refresh-token', {refreshToken})
      .pipe(map(res => {
        if (res) {
          this.authStore.update(res);
          return res;
        }
      }));
  }
}
