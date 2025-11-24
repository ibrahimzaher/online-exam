import { TestBed } from '@angular/core/testing';

import { ProfileDataUsecaseService } from './profile-data.usecase.service';

describe('ProfileDataUsecaseService', () => {
  let service: ProfileDataUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDataUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
