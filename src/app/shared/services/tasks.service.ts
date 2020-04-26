import { Injectable } from '@angular/core';
import { StatusService } from './status.service';
import { StorageService } from './storage.service';
import { LogService } from './log.service';
import * as moment from 'moment';

import {
  StoredTasks,
  Task,
  ActiveTask,
  TaskDef
} from 'app/types/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private activeTask: ActiveTask;
  private queuedTasks: Task[];


  public getActiveTask(): ActiveTask {
    return this.activeTask || null;
  }


  public getQueuedTasks(): Task[] {
    return this.queuedTasks || [];
  }


  public add(t: TaskDef): void {
    if (this.getActiveTask()) {
      this.queuedTasks.push({
        id: t.id,
        uid: this.genUID(),
        name: t.name,
        icon: t.icon || '',
        cost: t.cost || 0,
        effort: t.effort || 0
      });
      this.save();
      return;
    }

    this.activeTask = {
      id: t.id,
      uid: this.genUID(),
      name: t.name,
      icon: t.icon || '',
      cost: t.cost || 0,
      effort: t.effort || 0,
      since: Number(new Date()),
      completed: 0
    };
    this.save();
  }


  public del(uid: string) {
    if (this.activeTask && this.activeTask.uid === uid) {
      this.activeTask = null;

      if (!this.queuedTasks.length) { return; }

      this.activeTask = Object.assign(
        { since: Number(new Date()), completed: 0 },
        this.queuedTasks.shift()
      );
      return;
    }

    const idx = this.queuedTasks.findIndex(t => t.uid === uid);
    if (idx < 0) { return; }

    this.queuedTasks.splice(idx, 1);
  }


  public shift() {
    if (!this.queuedTasks.length) {
      this.activeTask = null;
      return;
    }

    this.activeTask = Object.assign(
      { since: Number(new Date()), completed: 0 },
      this.queuedTasks.shift()
    );
  }


  public genUID(): string {
    const chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
    for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case 'x':
          chars[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case 'y':
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
      }
    }
    return chars.join('');
  }


  public tack(m: moment.Moment): void {
    if (!this.activeTask) {
      if (!this.queuedTasks.length) {
        return;
      }
      this.shift();
    }

    const efficiency = this.status.getEfficiency();
    this.activeTask.completed += efficiency;

    if (this.activeTask.completed < this.activeTask.effort) {
      return;
    }

    // completed
    this.log.add({
      title: 'Task Completed',
      text: `${this.activeTask.name}`,
      time: Number(m),
      type:'success',
    })
    this.shift();
  }


  public save(): void {
    this.storage.save<StoredTasks>('tasks', {
      activeTask: this.activeTask,
      queuedTasks: this.queuedTasks
    });
  }


  public init(): void {
    const stored = this.storage.get<StoredTasks>('tasks') || {
      activeTask: null,
      queuedTasks: []
    };
    this.activeTask = stored.activeTask;
    this.queuedTasks = stored.queuedTasks || [];
  }


  constructor(
    protected log: LogService,
    protected status: StatusService,
    protected storage: StorageService
  ) { }
}
