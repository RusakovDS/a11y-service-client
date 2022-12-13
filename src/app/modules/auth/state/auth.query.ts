import {Query} from '@datorama/akita';
import {AuthStore, AuthState} from './auth.store';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthQuery extends Query<AuthState> {

  isLogin$ = this.select(store => !!store.accessToken);
  email$ = this.select('email');

  constructor(protected store: AuthStore) {
    super(store);
  }

  get hasToken() {
    return !!this.getValue().accessToken;
  }

}
