import { Injectable } from '@angular/core';
import { KarmaService } from '../karma/karma.service';
import { StorageService } from '../storage/storage.service';
import { DispWeather, StoredWeather, Weather } from 'app/types/weather';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherStatusService {


  private weather: Weather;
  private defaultThrottle = 12 * 10; // once in 10 min. (60 / 5 = 12)
  private minTransition = 6 * 12; // 12 hrs
  private maxTransition = 6 * 12; // 24 hrs
  private dispWeatherName = [
    'Sunny',
    'Cloudy',
    'Rainy'
  ]


  public getDispStatus(): DispWeather {
    const idx = this.weather.transition[0];
    return {
      now: this.dispWeatherName[idx]
    };
  }


  public reset(): void {
    this.storage.reset('ship');
    this.init();
  }


  public generateTransition(): void  {
    if (this.weather.transition.length > this.minTransition) { return; }
    while(this.weather.transition.length < this.maxTransition) {
      this.karma.turn(this.weather.karma);
      this.weather.transition.push(this.weather.karma.index);
    }
  }


  public tack(m: moment.Moment): void {
    if (this.weather.throttle > 0) {
      this.weather.throttle -= 1;
      return;
    }
    this.weather.throttle = this.defaultThrottle;
    this.weather.transition.shift();
    this.generateTransition();
  }


  public save(): void {
    this.storage.save<StoredWeather>('weather', {
      karma: this.weather.karma,
      transition: this.weather.transition,
      throttle: this.weather.throttle,
    });
  }


  public load(): void {
    const stored = this.storage.get<StoredWeather>('weather') || {
      karma: {
        chances: [70, 20, 20],
        index: 0,
        karma: [0, 0, 0],
        threshold: 0,
        type: 't'
      },
      transition: [],
      throttle: this.defaultThrottle
    };

    this.weather = stored;
  }


  public init() {
    this.load();
    this.generateTransition()
  }


  constructor(
    protected storage: StorageService,
    protected karma: KarmaService,
  ) { }
}
