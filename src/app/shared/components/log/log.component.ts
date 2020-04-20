import { Component, OnInit, Input } from '@angular/core';


const log = [
  { title: 'test', details: '', time: 1586622914770 }
];


@Component({
  selector: 'vy-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  @Input() logs: Array<any> = log;

  constructor() { }

  ngOnInit(): void {
  }

}
