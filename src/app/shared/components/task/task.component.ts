import { Component, OnInit, Input } from '@angular/core';

const task = {
  title: 'Build',
  progressMax: 100,
  progressNow: 50
}

@Component({
  selector: 'vy-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() linkto: string = '';


  public task: any = task;


  constructor() { }


  ngOnInit(): void {
  }

}
