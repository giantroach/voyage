import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksService } from 'app/shared/services/tasks.service'

import { TaskDef } from 'app/types/tasks';

// FIXME: locate this better place
const tasks = [
  { id: 'B0', name: 'Build', icon: 'build', subTasks: [
    { id: 'B1', name: 'Firm', icon: 'local_pizza', cost: 100 },
    { id: 'B1', name: 'Mast', icon: 'directions_boat', cost: 100 }
  ] },
  { id: 'F0', name: 'Fishing', icon: 'restaurant', cost: 100 }
];

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  private task: string;
  private taskDef: TaskDef[] = tasks as TaskDef[];


  public getTaskDef(): TaskDef[] {
    if (this.task) {
      return this.taskDef.find(t => t.id === this.task).subTasks;
    }
    return this.taskDef;
  }


  public addTask(taskDef: TaskDef): void {
    this.tasksService.add(taskDef);
    this.snackBar.open(`Task ${taskDef.name} is added` , 'OK', {
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
    this.task = this.route.snapshot.paramMap.get('task');
  }

}
