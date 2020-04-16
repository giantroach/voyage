import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

const status = {
  progress: {
    distance: 100,
    since: 1586779626490
  },
  you: {
    health: 100,
    food: 90,
    water: 80,
    debris: 70
  },
  env: {
    weather: 'sunny'
  }
};

@Component({
  selector: 'vy-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() status: any = status;

  // you
  private lv: number;
  private healthPer: number;
  private foodPer: number;
  private waterPer: number;


  // progress and environments
  private day: number;
  private distance: number;
  private weather: string;


  public refresh(): void {
    this.lv = Math.floor(
      this.status.progress.distance / 20
        * Math.log((Number(new Date()) - this.status.progress.since) / 1000)
    ) + 1;

    this.healthPer = Math.ceil(
      this.status.you.health / (Math.log(this.lv) + 1)
    );

    this.foodPer = Math.ceil(
      this.status.you.food / (Math.log(this.lv) + 1)
    );

    this.waterPer = Math.ceil(
      this.status.you.water / (Math.log(this.lv) + 1)
    );

    this.day = moment().diff(moment(this.status.progress.since), 'days');
    this.distance = this.status.progress.distance;
    this.weather = this.status.env.weather;
  }


  public get(key: string) {
    switch(key) {
      case 'lv':
        return this.lv;

      case 'health':
        return this.healthPer;

      case 'food':
        return this.foodPer;

      case 'water':
        return this.waterPer;

      case 'day':
        return this.day;

      case 'distance':
        return this.distance;

      case 'weather':
        return this.weather;
    }
  }


  constructor() { }


  ngOnInit(): void {
    this.refresh();
  }

}
