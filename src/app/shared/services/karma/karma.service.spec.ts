import { TestBed } from '@angular/core/testing';

import { KarmaService } from './karma.service';

xdescribe('KarmaService', () => {
  let service: KarmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KarmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
