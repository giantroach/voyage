import { Injectable, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TickService {

  @Output() tick = new EventEmitter<void>(); // 追加

  private lastTick: moment.Moment = null;
  // FIXME: This must be configured
  private tickScale: number = 0.1;


  public init(): void {
    if (this.lastTick) {
      // FIXME: Here we should store the rounded down stuff and apply for the initial tick
      const numOfTicks = Math.floor(moment().diff(this.lastTick, 'minutes') / this.tickScale);
      (new Array(numOfTicks)).forEach(() => {
        this.ticks(this.lastTick.add(this.tickScale, 'minutes'));
      });
    }
    this.lastTick = moment();

    setInterval(() => {
      console.log('tick!')
      const m = moment();
      this.ticks(m);
      this.lastTick = m;
    }, 60 * 1000 * this.tickScale);
  }


  public ticks(m: moment.Moment): void {
    console.log('tick', m.format());
    this.tick.emit();
  }

}
