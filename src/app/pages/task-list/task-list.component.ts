import { Component, OnInit } from '@angular/core';
import { TasksService } from 'app/shared/services/';

@Component({
  selector: 'vy-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks = [];
  public hasActiveTask = false;


  public refresh() {
    this.hasActiveTask = !!this.tasksService.getActiveTask();
    this.tasks = this.tasksService.getQueuedTasks();
  }


  constructor(
    public tasksService: TasksService
  ) { }


  ngOnInit(): void {
    this.refresh();
  }

}
