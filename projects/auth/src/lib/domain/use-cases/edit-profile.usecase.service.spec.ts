import { TestBed } from '@angular/core/testing';

import { EditProfileUsecaseService } from './edit-profile.usecase.service';

describe('EditProfileUsecaseService', () => {
  let service: EditProfileUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProfileUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
