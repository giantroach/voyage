import { Component, OnInit } from '@angular/core';


const tasks = [
  { title: 'test1', volume: 10 },
  { title: 'test2', volume: 10 }
]

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  public tasks = tasks;


  constructor() { }

  ngOnInit(): void {
  }

}
