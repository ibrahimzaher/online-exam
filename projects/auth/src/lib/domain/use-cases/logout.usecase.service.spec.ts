import { TestBed } from '@angular/core/testing';

import { LogoutUsecaseService } from './logout.usecase.service';

describe('LogoutUsecaseService', () => {
  let service: LogoutUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
