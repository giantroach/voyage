import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksService } from 'app/shared/services/tasks.service';

import { TaskDef } from 'app/types/tasks';

@Component({
  selector: 'vy-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() linkTo = '';
  @Input() newTask = false;
  @Input() taskDef: TaskDef = null;


  public deleteTask() {
    this.tasksService.del(this.taskDef.uid);
    this.snackBar.open(`Task ${this.taskDef.name} is deleted` , 'OK', {
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
  }

}
