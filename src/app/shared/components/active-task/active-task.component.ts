import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskComponent } from 'app/shared/components/task/task.component';
import { TasksService } from 'app/shared/services/';
import { ClerkService } from 'app/shared/services/clerk.service';

import { ActiveTask } from 'app/types/tasks';

@Component({
  selector: 'vy-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.scss']
})
export class ActiveTaskComponent extends TaskComponent implements OnInit {

  @Input() linkTo = '';


  public task: ActiveTask = null;


  public progress = 0;


  public refresh(): void {
    this.task = this.tasksService.getActiveTask();
    if (!this.task) { return; }
    this.progress = Math.floor(this.task.completed / this.task.effort * 100) || 0;
  }


  public showDetail(): void {
    // FIXME:
  }


  constructor(
    protected clerkService: ClerkService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected tasksService: TasksService,
  ) {
    super(
      route,
      router,
      snackBar,
      tasksService,
    );
  }


  ngOnInit(): void {
    this.refresh();

    this.clerkService.notification.subscribe(() => {
      this.refresh();
    });
  }
}
