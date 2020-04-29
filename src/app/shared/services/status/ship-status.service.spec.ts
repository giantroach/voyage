import { TestBed } from '@angular/core/testing';

import { ShipStatusService } from './ship-status.service';

describe('ShipStatusService', () => {
  let service: ShipStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
