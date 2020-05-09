import { Component, OnInit, Input } from '@angular/core';
import { ClerkService } from 'app/shared/services/clerk/clerk.service';
import * as moment from 'moment';

import {
  StatusService,
  JourneyStatusService,
  PlayerStatusService
} from 'app/shared/services/';


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
    const dispPlayer = this.playerStatusService.getDispStatus();
    const dispJourney = this.journeyStatusService.getDispStatus();

    // player: playerStatusService
    this.level = dispPlayer.level;
    this.healthPer = this.toFixed(dispPlayer.healthPer * 100);
    this.foodPer = this.toFixed(dispPlayer.foodPer * 100);
    this.waterPer = this.toFixed(dispPlayer.waterPer * 100);

    // journey: journeyStatusService
    this.day = dispJourney.days;
    this.distance = this.toFixed(dispJourney.distance);

    // env
    this.weather = dispStatus.env.weather;
  }


  public get(key: string) {
    switch (key) {
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


  public toFixed(n: number, digits = 1): number {
    return Number(n.toFixed(digits));
  }


  constructor(
    protected statusService: StatusService,
    protected journeyStatusService: JourneyStatusService,
    protected playerStatusService: PlayerStatusService,
    protected clerkService: ClerkService
  ) { }


  ngOnInit(): void {
    this.refresh();
    this.clerkService.notification.subscribe(() => {
      this.refresh();
    });
  }

}
