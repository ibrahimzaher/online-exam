import { TestBed } from '@angular/core/testing';

import { ResetPasswordUsecaseService } from './reset-password.usecase.service';

describe('ResetPasswordUsecaseService', () => {
  let service: ResetPasswordUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
