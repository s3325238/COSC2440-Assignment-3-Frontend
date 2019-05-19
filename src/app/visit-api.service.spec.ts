import { TestBed } from '@angular/core/testing';

import { VisitApiService } from './visit-api.service';

describe('VisitApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisitApiService = TestBed.get(VisitApiService);
    expect(service).toBeTruthy();
  });
});
