import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { StatusService } from 'app/shared/services/status.service';


@Component({
  selector: 'vy-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() status: any = status;

  // you
  private level: number;
  private healthPer: number;
  private foodPer: number;
  private waterPer: number;


  // progress and environments
  private day: number;
  private distance: number;
  private weather: string;


  public refresh(): void {
    const dispStatus = this.statusService.getDispStatus();

    // you
    this.level = dispStatus.you.level;
    this.healthPer = dispStatus.you.healthPer * 100;
    this.foodPer = dispStatus.you.foodPer * 100;
    this.waterPer = dispStatus.you.waterPer * 100;

    // progress
    this.day = dispStatus.progress.days;
    this.distance = dispStatus.progress.distance;

    // env
    this.weather = dispStatus.env.weather;
  }


  public get(key: string) {
    switch(key) {
      case 'level':
        return this.level;

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


  constructor(
    protected statusService: StatusService
  ) { }


  ngOnInit(): void {
    this.refresh();
  }

}
