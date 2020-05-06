import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService, ShipStatusService, FacilitiesService } from 'app/shared/services/';

import { TaskDef, TaskCategoryDef, TaskDetailDef } from 'app/types/tasks';
import { FacilityDef } from 'app/types/facilities';

interface IteratableCat {
  category: string;
  icon: string;
  id: string;
  name: string;
}

@Component({
  selector: 'vy-ship-edit',
  templateUrl: './ship-edit.component.html',
  styleUrls: ['./ship-edit.component.scss']
})
export class ShipEditComponent implements OnInit {


  public facilityDef: FacilityDef = null;
  public itrblCat: IteratableCat[] = null;
  public category = '';
  public facilityID = '';
  public newFacilitySize: number[] = null;


  public selectBuild(subTaskDef: TaskDetailDef) {
    const facility = this.facilitiesService.getFacilityDetailDef('build', subTaskDef.id);
  }


  public selectLocation([x, y]: number[]) {
    const buildTasks = this.tasksService.getTaskCategoryDef('build');
    const task = buildTasks.subTasks.find(st => st.id === this.facilityID);

    task.args = [this.category, this.facilityID, [x, y]];

    this.tasksService.add('build', task);
    this.snackBar.open(`Task ${task.name} is added` , 'OK', {
      duration: 3000
    });
    this.router.navigate(['/']);
  }


  constructor(
    protected facilitiesService: FacilitiesService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected shipStatusService: ShipStatusService,
    protected snackBar: MatSnackBar,
    protected tasksService: TasksService,
  ) { }


  ngOnInit(): void {
    this.facilityDef = this.facilitiesService.getFacilityDef();
    this.itrblCat = Object.keys(this.facilityDef).map((key) => {
      const def = this.facilityDef[key];
      return {
        category: key,
        icon: def.icon,
        id: def.id,
        name: def.name,
      };
    });

    this.route.params.subscribe((params) => {
      this.category = params.category || '';
      this.facilityID = params.facility || '';

      if (this.category && this.facilityID) {
        this.newFacilitySize = this.facilityDef[this.category].details.find((f) => {
          return f.id === this.facilityID;
        }).size;

      } else {
        this.newFacilitySize = null;
      }
    });
  }

}
