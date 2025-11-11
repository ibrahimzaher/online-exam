import { TestBed } from '@angular/core/testing';

import { LoginUsecaseService } from './login.usecase.service';

describe('LoginUsecaseService', () => {
  let service: LoginUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
