import { TestBed } from '@angular/core/testing';

import { DeleteMeUsecaseService } from './delete-me.usecase.service';

describe('DeleteMeUsecaseService', () => {
  let service: DeleteMeUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteMeUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
