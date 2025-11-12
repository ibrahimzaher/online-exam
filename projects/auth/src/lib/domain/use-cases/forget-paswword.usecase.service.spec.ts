import { TestBed } from '@angular/core/testing';

import { ForgetPaswwordUsecaseService } from './forget-paswword.usecase.service';

describe('ForgetPaswwordUsecaseService', () => {
  let service: ForgetPaswwordUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetPaswwordUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
