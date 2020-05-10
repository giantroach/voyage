import { Injectable, Output, EventEmitter } from '@angular/core';
import { LogService } from '../log/log.service';
import { PlayerStatusService } from '../status/player-status.service';
import { ShipStatusService } from '../status/ship-status.service';
import { JourneyStatusService } from '../status/journey-status.service';
import { WeatherStatusService } from '../status/weather-status.service';
import { EventsService } from '../events/events.service';
import { StorageService } from '../storage/storage.service';
import { TasksService } from '../tasks/tasks.service';
import { TickService } from '../tick/tick.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ClerkService {

  @Output() notification = new EventEmitter<void>();


  public handle(m: moment.Moment): void {
    console.log('handling');
    this.tasks.tack(m);
    this.journeyStatus.tack(m);
    this.playerStatus.tack(m);
    this.weatherStatus.tack(m);
    this.save();
    this.notification.emit();
  }


  public save(): void {
    this.tasks.save();
    this.tick.save();
    this.journeyStatus.save();
    this.playerStatus.save();
    this.shipStatus.save();
    this.weatherStatus.save();
  }


  public restart(): void {
    this.tasks.reset();
    this.tick.reset();
    this.journeyStatus.reset();
    this.playerStatus.reset();
    this.shipStatus.reset();
    this.weatherStatus.reset();
  }


  public init(): void {
    this.storage.init();

    this.events.init();
    this.log.init();
    this.journeyStatus.init();
    this.playerStatus.init();
    this.shipStatus.init();
    this.weatherStatus.init();
    this.tasks.init();

    this.tick.init();
    this.tick.tick.subscribe((m) => {
      this.handle(m);
    });
  }


  constructor(
    protected events: EventsService,
    protected log: LogService,
    protected journeyStatus: JourneyStatusService,
    protected playerStatus: PlayerStatusService,
    protected shipStatus: ShipStatusService,
    protected weatherStatus: WeatherStatusService,
    protected storage: StorageService,
    protected tasks: TasksService,
    protected tick: TickService,
  ) { }

}
