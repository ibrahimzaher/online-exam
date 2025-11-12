import { TestBed } from '@angular/core/testing';

import { RegisterUsecaseService } from './register.usecase.service';

describe('RegisterUsecaseService', () => {
  let service: RegisterUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
