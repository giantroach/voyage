import { Component, OnInit, Input } from '@angular/core';

const task = {
  title: 'Build',
  progressMax: 100,
  progressNow: 50
}

@Component({
  selector: 'vy-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.scss']
})
export class ActiveTaskComponent implements OnInit {

  @Input() linkTo: string = '';


  public task: any = task;


  public progress: number = 0;


  public refresh(): void {
  }


  public showDetail(): void {
    // FIXME:
  }


  constructor() { }

  ngOnInit(): void {
  }
}
