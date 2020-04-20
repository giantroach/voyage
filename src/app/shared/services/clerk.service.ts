import { Injectable, Output, EventEmitter } from '@angular/core';
import { StatusService } from './status.service';
import { StorageService } from './storage.service';
import { TasksService } from './tasks.service';
import { TickService } from './tick.service';


@Injectable({
  providedIn: 'root'
})
export class ClerkService {

  @Output() notification = new EventEmitter<void>();


  public handle(): void {
    console.log('handling');
    this.tasks.tack();
    this.save();
    this.notification.emit();
  }


  public save(): void {
    this.tasks.save();
  }


  public init(): void {
    this.storage.init();
    this.status.init();
    this.tasks.init();

    this.tick.init();
    this.tick.tick.subscribe((m) => {
      this.handle();
    });
  }


  constructor(
    protected status: StatusService,
    protected storage: StorageService,
    protected tasks: TasksService,
    protected tick: TickService
  ) { }

}
