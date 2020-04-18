import { Component, OnInit } from '@angular/core';
import { TasksService } from 'app/shared/services/tasks.service';

@Component({
  selector: 'vy-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks = [];


  public refresh() {
    // this.tasksService.getActiveTask();
    this.tasks = this.tasksService.getQueuedTasks();
    console.log('this.tasks', this.tasks);
  }


  constructor(
    public tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

}
