import { Injectable } from '@angular/core';
import { StoreConfig, Store, ID } from '@datorama/akita';

export interface AuthState {
  id: ID;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export function createInitialState(): AuthState {
  return {
    id: null,
    email: '',
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'auth',
  resettable: true
})
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
