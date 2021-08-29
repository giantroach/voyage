import { Injectable, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import * as moment from 'moment';

import {
  StoredTicks,
} from 'app/types/ticks';

@Injectable({
  providedIn: 'root'
})
export class TickService {

  @Output() tick = new EventEmitter<moment.Moment>();

  private lastTick: moment.Moment = null;
  // FIXME: This must be configured
  private tickScale = 5; // seconds

  private timer: number;


  public reset(): void {
    this.storage.reset('ticks');
    clearInterval(this.timer);
    this.init();
  }


  public save(): void {
    this.storage.save<StoredTicks>('ticks', {
      lastTick: Number(this.lastTick),
    });
  }


  public load(): void {
    const stored = this.storage.get<StoredTicks>('ticks');
    if (stored && stored.lastTick) {
      this.lastTick = moment(stored.lastTick);
      return;
    }
    this.lastTick = null;
  }


  public init(): void {
    this.load();

    if (this.lastTick) {
      // FIXME: Here we should store the rounded down stuff and apply for the initial tick
      const numOfTicks = Math.floor(moment().diff(this.lastTick, 'seconds') / this.tickScale);
      for (let i = 0; i < numOfTicks; i += 1) {
        this.ticks(this.lastTick.add(this.tickScale, 'seconds'));
      }
    }
    this.lastTick = moment();

    this.timer = window.setInterval(() => {
      console.log('tick!');
      const m = moment();
      this.ticks(m);
      this.lastTick = m;
    }, 1000 * this.tickScale);
  }


  public ticks(m: moment.Moment): void {
    console.log('tick', m.format());
    this.tick.emit(m);
  }

  constructor(
    protected storage: StorageService
  ) { }

}
