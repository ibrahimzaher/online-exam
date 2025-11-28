import { TestBed } from '@angular/core/testing';

import { ForgetPasswordUsecaseService } from './forget-password.usecase.service';

describe('ForgetPasswordUsecaseService', () => {
  let service: ForgetPasswordUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetPasswordUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
