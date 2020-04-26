import { TestBed } from '@angular/core/testing';

import { PlayerStatusService } from './player-status.service';

describe('PlayerStatusService', () => {
  let service: PlayerStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
