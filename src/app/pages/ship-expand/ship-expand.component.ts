import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService, ShipStatusService } from 'app/shared/services/';

import { TaskDef, ParentTaskDef, SubTaskDef } from 'app/types/tasks';

@Component({
  selector: 'vy-ship-expand',
  templateUrl: './ship-expand.component.html',
  styleUrls: ['./ship-expand.component.scss']
})
export class ShipExpandComponent implements OnInit {


  public expandX = false;
  public expandY = false;
  public expandTasks: ParentTaskDef = null;


  public focus(xy: string): void {
    const focus = xy.toUpperCase();
    const defocus = focus === 'X' ? 'Y' : 'X';

    this['expand' + focus] = true;
    this['expand' + defocus] = false;
  }


  public addTask(subTaskDef: SubTaskDef): void {
    const task = JSON.parse(JSON.stringify(subTaskDef));
    const space = this.shipStatusService.getSpace();

    let n = 0;
    if (task.params.direction === 'X') {
      n = space[0];
    } else {
      n = space[1];
    }
    task.cost = 1 * n * n;
    task.effort = 1 * n * n;

    this.tasksService.add(task);
    this.snackBar.open(`Task ${task.name} is added` , 'OK', {
      duration: 3000
    });
    this.router.navigate(['/']);
  }


  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected tasksService: TasksService,
    protected snackBar: MatSnackBar,
    protected shipStatusService: ShipStatusService,
  ) { }


  ngOnInit(): void {
    this.expandTasks = this.tasksService.getParentTaskDef('expand');
  }

}
