import { Component, OnInit } from '@angular/core';
import { LogService } from 'app/shared/services/log.service';

import { Log } from 'app/types/log';

@Component({
  selector: 'vy-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  public logs: Log[] = [];


  public refresh() {
    this.logs = this.logService.get();
  }


  constructor(
    protected logService: LogService
  ) { }


  ngOnInit(): void {
    this.refresh();

    this.logService.notification.subscribe((logs) => {
      this.logs = logs;
    });
  }

}
