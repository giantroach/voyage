import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TasksService } from './tasks.service';
import { TickService } from './tick.service';


@Injectable({
  providedIn: 'root'
})
export class ClerkService {

  public handle(): void {
    console.log('handling')

    this.save();
  }


  public save(): void {
    this.tasks.save();
  }


  public init(): void {
    this.storage.init();
    this.tasks.init();

    this.tick.init();
    this.tick.tick.subscribe((m) => {
      this.handle();
    });
  }


  constructor(
    protected storage: StorageService,
    protected tasks: TasksService,
    protected tick: TickService
  ) { }

}
