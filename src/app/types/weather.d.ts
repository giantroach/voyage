import { Karma } from './karma';

interface StoredWeather {
  karma: Karma;
  transition: number[];
  throttle: number;
}


interface Weather extends StoredWeather {
}


interface DispWeather {
  now: string;
}


export {
  StoredWeather,
  Weather,
  DispWeather
}
