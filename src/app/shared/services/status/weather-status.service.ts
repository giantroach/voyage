import { Injectable } from '@angular/core';
import { DispWeather } from 'app/types/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherStatusService {

  public getDispStatus(): DispWeather {
    return {
      now: 'Sunny'
    };
  }

  constructor() { }
}
