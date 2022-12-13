import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {ThrowStmt} from '@angular/compiler';

const mockUser = {
  username: 'rusakov@yandex.ru',
  password: '1q2w3e4r5t6y7u8i'
};

const invalidMockUser = {
  username: 'rus@yand.com',
  password: '1111111111'
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler, AuthService, ApiService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
