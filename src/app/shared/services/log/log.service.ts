import { Injectable, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../storage/storage.service';

import { Log } from 'app/types/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  @Output() notification = new EventEmitter<any>();


  private log: Log[] = [];


  public get(): Log[] {
    return this.log;
  }


  public add(log: Log): void {
    this.log.unshift(log);
    this.save();
    this.notification.emit(this.log);
  }


  public addNoDup(log: Log): void {
    const lastLog = this.log[0];
    if (lastLog &&
      lastLog.title === log.title &&
      lastLog.text === log.text &&
      lastLog.type === log.type) {

      this.log[0].time = log.time;
      this.save();
      this.notification.emit(this.log);
      return;
    }

    this.log.unshift(log);
    this.save();
    this.notification.emit(this.log);
  }


  public reset(): void {
    this.storage.reset('log');
    this.init();
  }


  public save(): void {
    this.storage.save<Log[]>('log', this.log);
  }


  public init(): void {
    const stored = this.storage.get<Log[]>('log');
    this.log = stored;
  }


  constructor(
    protected storage: StorageService
  ) { }
}
