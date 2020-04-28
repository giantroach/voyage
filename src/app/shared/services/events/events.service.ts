import { Injectable } from '@angular/core';
import { TasksService } from '../';
import { EventResolverService } from './event-resolver.service';

import { Event } from 'app/types/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  public init() {
    this.tasks.event.subscribe((e: Event) => {
      this.resolver.resolve(e);
    });
  }


  constructor(
    protected tasks: TasksService,
    protected resolver: EventResolverService
  ) { }

}
