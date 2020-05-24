import { Injectable, Output, EventEmitter } from '@angular/core';
import { PlayerStatusService } from '../status/player-status.service';
import { StorageService } from '../storage/storage.service';
import { LogService } from '../log/log.service';
import taskDef from './task-def.json';
import * as moment from 'moment';

import {
  StoredTasks,
  Task,
  ActiveTask,
  TaskDef,
  TaskCategoryDef,
  TaskDetailDef
} from 'app/types/tasks';
import { Event } from 'app/types/event';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  @Output() event = new EventEmitter<Event>();


  private activeTask: ActiveTask;
  private queuedTasks: Task[];


  public getActiveTask(): ActiveTask {
    return this.activeTask || null;
  }


  public getQueuedTasks(): Task[] {
    return this.queuedTasks || [];
  }


  public getTaskDef(): TaskDef {
    return JSON.parse(JSON.stringify(taskDef));
  }


  public getTaskCategoryDef(key): TaskCategoryDef {
    return JSON.parse(JSON.stringify(taskDef[key]));
  }


  public add(category: string, t: TaskDetailDef): void {
    this.queuedTasks.push({
      id: t.id,
      category,
      uid: this.genUID(),
      name: t.name,
      icon: t.icon || '',
      cost: t.cost || 0,
      effort: t.effort || 0,
      params: t.params || null,
      args: t.args || null
    });
    this.save();

    if (!this.getActiveTask()) {
      this.shift(moment());
    }

    return;
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


  public shift(m: moment.Moment): boolean {
    if (!this.queuedTasks.length) {
      this.activeTask = null;
      return true;
    }

    const nextTask = this.queuedTasks[0];
    if (!this.playerStatus.useDebris(nextTask.cost)) {
      // Log output
      this.log.addNoDup({
        title: 'Task failed: ' + nextTask.name,
        text: 'Task: ' + nextTask.name + ' cloudln\'t be started: Lack of debris.',
        time: Number(m),
        type: 'error'
      });
      this.queuedTasks.shift();
      return false;
    }

    this.activeTask = Object.assign(
      { since: Number(m), completed: 0 },
      this.queuedTasks.shift()
    );
    return true;
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
      if (!this.shift(m)) { return; }
    }

    const efficiency = this.playerStatus.getEfficiency();
    this.activeTask.completed += efficiency;

    if (this.activeTask.completed < this.activeTask.effort) {
      return;
    }

    // completed
    this.log.add({
      title: 'Task Completed',
      text: `${this.activeTask.name}`,
      time: Number(m),
      type: 'success',
    });
    this.event.emit({
      category: 'task',
      subCategory: this.activeTask.category,
      args: this.activeTask.args
    });

    this.shift(m);
  }


  public reset(): void {
    this.storage.reset('tasks');
    this.init();
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
    protected playerStatus: PlayerStatusService,
    protected storage: StorageService
  ) { }
}
