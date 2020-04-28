import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faFish, faCog } from '@fortawesome/free-solid-svg-icons';

import { TasksService } from 'app/shared/services/';

import { Task } from 'app/types/tasks';

@Component({
  selector: 'vy-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() linkTo = '';
  @Input() newTask = false;
  @Input() task: Task = null;


  public getIcon(icon: string) {
    console.log('icon', icon)
    console.log('task', this.task)
    switch (icon) {
      case 'fish':
        return faFish;
      default:
        return faCog;
    }
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
    protected snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
  }

}
