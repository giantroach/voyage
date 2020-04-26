// DEPRECATED
import { Injectable, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { StorageService } from '../storage.service';

import { Status, DispStatus } from 'app/types/status';

const defaultStatus = {
  progress: {
    distance: 0,
    since: null
  },
  you: {
    health: 100,
    food: 100,
    water: 100,
    debris: 100
  },
  env: {
    weather: 'Sunny'
  }
};

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private status: Status = null;
  private level: number = null;

  public refresh() {
    this.level = this.getLevel();
  }


  public getDispStatus(): DispStatus {
    return {
      progress: {
        days: this.getDays(),
        distance: this.status.progress.distance,
      },
      you: {
        level: this.level,
        healthPer: Math.ceil(this.status.you.health / (this.getMaxHealth())),
        foodPer: Math.ceil(this.status.you.food / (this.getMaxFood())),
        waterPer: Math.ceil(this.status.you.water / (this.getMaxWater())),
      },
      env: {
        weather: this.status.env.weather
      }
    };
  }


  public save(): void {
    this.storage.save<Status>('status', this.status);
  }


  public getEfficiency(): number {
    return Math.log(this.level) + 1;
  }


  private getLevel(): number {
    const lv = Math.floor(
      this.status.progress.distance / 20
        * Math.log((Number(new Date()) - this.status.progress.since) / 1000)
    ) + 1;
    return lv < 100 ? lv : 100;
  }


  private getDays(): number {
    const since = this.status.progress.since;
    if (!since) { return 0; }
    return moment().diff(moment(since), 'days');
  }


  private getMaxHealth(): number {
    return Math.ceil((Math.log(this.level) + 1) * 100);
  }


  private getMaxFood(): number {
    return Math.ceil((Math.log(this.level) + 1) * 100);
  }


  private getMaxWater(): number {
    return Math.ceil((Math.log(this.level) + 1) * 100);
  }


  public init(): void {
    this.status = this.storage.get<Status>('status') || defaultStatus;
    this.refresh();
  }

  constructor(
    protected storage: StorageService
  ) { }
}
