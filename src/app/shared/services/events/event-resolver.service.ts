import { Injectable } from '@angular/core';
import { Event } from 'app/types/event';
import Def from './event-def.json';

import { PlayerStatusService } from '../status/player-status.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService {


  public resolve(e: Event) {
    console.log('resolve');
    // FIXME:
  }


  constructor(
    protected playerStatus: PlayerStatusService
  ) { }
}
