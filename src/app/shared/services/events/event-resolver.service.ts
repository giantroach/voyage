import { Injectable } from '@angular/core';
import { Event } from 'app/types/event';
import def from './event-def.json';

import { PlayerStatusService } from '../status/player-status.service';
import { ShipStatusService } from '../status/ship-status.service';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService {


  public resolve(e: Event) {
    console.log('resolve', e);
    const target = def[e.category][e.subCategory];

    target.does.forEach((d) => {
      const args = d.args.concat(e.args);
      this[d.service][d.method].apply(this[d.service], args);
    });
  }


  constructor(
    protected playerStatus: PlayerStatusService,
    protected shipStatus: ShipStatusService,
    protected log: LogService
  ) { }
}
