import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const mockUser = {
  email: 'rusakov@yandex.ru',
  password: '1q2w3e4r5t6y7u8i'
};

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST and return token data', () => {
    service.post('auth/login', mockUser).subscribe((res) => {
      expect(res).toContain('access-token');
    });

    const req = httpMock.expectOne('https://localhost:3000/api/login');
    expect(req.request.method).toBe('Post');
    req.flush(req);
  });
});
