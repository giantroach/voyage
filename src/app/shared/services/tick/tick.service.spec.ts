import { TestBed } from '@angular/core/testing';

import { TickService } from './tick.service';

xdescribe('TickService', () => {
  let service: TickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
