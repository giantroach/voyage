import { TestBed } from '@angular/core/testing';

import { WeatherStatusService } from './weather-status.service';

xdescribe('WeatherStatusService', () => {
  let service: WeatherStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
