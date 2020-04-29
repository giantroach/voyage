import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { ShipStatusService } from './ship-status.service';
import * as moment from 'moment';

import { Journey, StoredJourney, DispJourney } from 'app/types/journey';

@Injectable({
  providedIn: 'root'
})
export class JourneyStatusService {

  private journey: Journey;


  private getDays(): number {
    const since = this.journey.since;
    if (!since) { return 0; }
    return moment().diff(moment(since), 'days');
  }


  public move(): void {
    const speed = this.shipStatus.getSpeed(); // per an hour
    this.journey.distance += (speed / 60 / 12);
  }


  public getJourney(): Journey {
    return this.journey;
  }


  public getDispStatus(): DispJourney {
    return {
      days: this.getDays(),
      distance: this.journey.distance,
    };
  }


  public tack(m: moment.Moment) {
    this.move();
  }


  public reset() {
    this.storage.reset('journey');
    this.init();
  }


  public save() {
    this.storage.save<StoredJourney>('journey', {
      since: this.journey.since,
      distance: this.journey.distance
    });
  }


  public load() {
    const stored = this.storage.get<Journey>('journey') || {
      since: Number(new Date()),
      distance: 0
    };

    this.journey = Object.assign(stored);
  }


  public init() {
    this.load();
  }


  constructor(
    protected storage: StorageService,
    protected shipStatus: ShipStatusService,
  ) { }
}
