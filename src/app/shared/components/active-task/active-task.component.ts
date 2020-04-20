import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksService } from 'app/shared/services/tasks.service';
import { ClerkService } from 'app/shared/services/clerk.service';

import { ActiveTask } from 'app/types/tasks';

@Component({
  selector: 'vy-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.scss']
})
export class ActiveTaskComponent implements OnInit {

  @Input() linkTo = '';


  public task: ActiveTask = null;


  public progress = 0;


  public refresh(): void {
    this.task = this.tasksService.getActiveTask();
    if (!this.task) { return; }
    this.progress = Math.floor(this.task.completed / this.task.cost * 100) || 0;
  }


  public showDetail(): void {
    // FIXME:
  }


  public deleteTask() {
    this.tasksService.del(this.task.uid);
    this.snackBar.open(`Task ${this.task.name} is deleted` , 'OK', {
      duration: 3000
    });
    this.router.navigate(['/tasks']);
  }


  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected tasksService: TasksService,
    protected snackBar: MatSnackBar,
    protected clerkService: ClerkService
  ) { }


  ngOnInit(): void {
    this.refresh();
    this.clerkService.notification.subscribe(() => {
      this.refresh();
    });
  }
}
