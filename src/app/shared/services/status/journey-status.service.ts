import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
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
    // FIXME:
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
  ) { }
}
