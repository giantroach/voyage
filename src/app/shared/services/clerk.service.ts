import { Injectable, Output, EventEmitter } from '@angular/core';
import { LogService } from './log.service';
import { StatusService, PlayerStatusService, JourneyStatusService } from './';
import { StorageService } from './storage.service';
import { TasksService } from './tasks.service';
import { TickService } from './tick.service';
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
    this.save();
    this.notification.emit();
  }


  public save(): void {
    this.tasks.save();
    this.tick.save();
    this.journeyStatus.save();
    this.playerStatus.save();
  }


  public init(): void {
    this.storage.init();

    this.log.init();
    this.status.init();
    this.journeyStatus.init();
    this.playerStatus.init();
    this.tasks.init();

    this.tick.init();
    this.tick.tick.subscribe((m) => {
      this.handle(m);
    });
  }


  constructor(
    protected log: LogService,
    protected journeyStatus: JourneyStatusService,
    protected playerStatus: PlayerStatusService,
    protected status: StatusService,
    protected storage: StorageService,
    protected tasks: TasksService,
    protected tick: TickService
  ) { }

}
