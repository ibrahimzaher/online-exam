import { TestBed } from '@angular/core/testing';

import { VerifyResetCodeUsecaseService } from './verify-reset-code.usecase.service';

describe('VerifyResetCodeUsecaseService', () => {
  let service: VerifyResetCodeUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyResetCodeUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
