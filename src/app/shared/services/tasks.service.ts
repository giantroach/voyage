import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
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
        cost: t.cost || 0
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
      since: Number(new Date()),
      completed: 0
    };
    this.save();
  }


  public del(uid: string) {
    if (this.activeTask && this.activeTask.uid === uid) {
      if (this.queuedTasks.length) {
        this.activeTask = null;
        return;
      }

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


  public genUID(): string {
    let chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
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


  public save(): void {
    this.storage.save<StoredTasks>('tasks', {
      activeTask: this.activeTask,
      queuedTasks: this.queuedTasks
    });
  }


  public init(): void {
    const stored = this.storage.get<StoredTasks>('tasks');
    this.activeTask = stored.activeTask;
    this.queuedTasks = stored.queuedTasks || [];
  }


  constructor(
    protected storage: StorageService
  ) { }
}
