import { Component, OnInit } from '@angular/core';
import { WeatherStatusService } from 'app/shared/services/';

@Component({
  selector: 'vy-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit {

  public weather = 0;


  constructor(
    protected weatherStatusService: WeatherStatusService
  ) { }

  ngOnInit(): void {
    this.weatherStatusService.changeWeather.subscribe((w) => {
      this.weather = w;
    });
  }

}
