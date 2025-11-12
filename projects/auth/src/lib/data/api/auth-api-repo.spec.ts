import { TestBed } from '@angular/core/testing';

import { AuthApiRepo } from './auth-api-repo';

describe('AuthApiRepo', () => {
  let service: AuthApiRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
