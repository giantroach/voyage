import { TestBed } from '@angular/core/testing';

import { JourneyStatusService } from './journey-status.service';

describe('JourneyStatusService', () => {
  let service: JourneyStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JourneyStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
