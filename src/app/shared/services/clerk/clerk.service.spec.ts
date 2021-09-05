import { TestBed } from '@angular/core/testing';

import { ClerkService } from './clerk.service';

xdescribe('ClerkService', () => {
  let service: ClerkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClerkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
