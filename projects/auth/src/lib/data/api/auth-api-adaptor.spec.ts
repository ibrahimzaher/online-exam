import { TestBed } from '@angular/core/testing';

import { AuthApiAdaptor } from './auth-api-adaptor';

describe('AuthApiAdaptor', () => {
  let service: AuthApiAdaptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiAdaptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
