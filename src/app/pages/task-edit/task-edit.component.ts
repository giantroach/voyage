import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksService } from 'app/shared/services/';

import { TaskDef, TaskCategoryDef, TaskDetailDef } from 'app/types/tasks';

interface IteratableCat {
  category: string;
  icon: string;
  id: string;
  name: string;
}

@Component({
  selector: 'vy-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  public taskDef: TaskDef = null;
  public category: string;

  public itrblCat: IteratableCat[] = null;


  public addTask(taskDetailDef: TaskDetailDef): void {
    this.tasksService.add(this.category, taskDetailDef);
    this.snackBar.open(`Task ${taskDetailDef.name} is added` , 'OK', {
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
    this.taskDef = this.tasksService.getTaskDef();
    this.itrblCat = Object.keys(this.taskDef).map((key) => {
      const def = this.taskDef[key];
      return {
        category: key,
        icon: def.icon,
        id: def.id,
        name: def.name,
        visible: def.visible
      };
    });

    this.route.params.subscribe((params) => {
      this.category = params.category || '';
    });
  }

}
