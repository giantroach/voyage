import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksService } from 'app/shared/services/';

import { TaskDef, ParentTaskDef, SubTaskDef } from 'app/types/tasks';

@Component({
  selector: 'vy-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  private taskID: string;
  private taskDef: TaskDef = null;


  public getTaskDef(): Array<ParentTaskDef | SubTaskDef> {
    if (this.taskID) {
      return Object.values(this.taskDef).find(t => t.id === this.taskID).subTasks;
    }
    return Object.values(this.taskDef);
  }


  public addTask(subTaskDef: SubTaskDef): void {
    this.tasksService.add(subTaskDef);
    this.snackBar.open(`Task ${subTaskDef.name} is added` , 'OK', {
      duration: 3000
    });
    this.router.navigate(['/tasks']);
  }


  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected tasksService: TasksService,
    protected snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.taskID = this.route.snapshot.paramMap.get('task');
    this.taskDef = this.tasksService.getTaskDef();
  }

}
