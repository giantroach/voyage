import { Injectable } from '@angular/core';
import { Event } from 'app/types/event';
import def from './event-def.json';

import { PlayerStatusService } from '../status/player-status.service';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService {


  public resolve(e: Event) {
    console.log('resolve', e);
    const target = def[e.type][e.id];
    target.does.forEach((d) => {
      this[d.service][d.method].apply(this[d.service], d.args);
    });
  }


  constructor(
    protected playerStatus: PlayerStatusService,
    protected log: LogService
  ) { }
}
