import { TestBed } from '@angular/core/testing';

import { ChangePasswordUsecaseService } from './change-password.usecase.service';

describe('ChangePasswordUsecaseService', () => {
  let service: ChangePasswordUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
