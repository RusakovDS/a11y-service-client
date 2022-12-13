import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler ]
    });
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
