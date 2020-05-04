import { Component, OnInit, Input } from '@angular/core';
import { FacilitiesService, ShipStatusService } from 'app/shared/services/';
import { ShipFacility } from 'app/types/ship';
import { FacilityDetailDef } from 'app/types/facilities';

@Component({
  selector: 'vy-ship-visual',
  templateUrl: './ship-visual.component.html',
  styleUrls: ['./ship-visual.component.scss']
})
export class ShipVisualComponent implements OnInit {


  @Input() expandX = false;
  @Input() expandY = false;


  public spaceX: number[];
  public spaceY: number[];
  public facilities: ShipFacility[];
  public facilityIdMap: {[id: string]: FacilityDetailDef} = {};


  // FIXME: this method is terribly slow, find more efficient way
  // e.g. attach class based on facilities rather than the cell base
  public getCellClass(x, y): string {
    let cls = '';
    const fs = this.facilities;

    for (let f of fs) {
      const fd = this.facilityIdMap[f.id];
      const pos = f.position;
      const xMin = pos[0];
      const xMax = pos[0] + fd.size[0] - 1;
      const yMin = pos[1];
      const yMax = pos[1] + fd.size[1] - 1;

      if ((x >= xMin) && (x <= xMax) && (y >= yMin) && (y <= yMax)) {
        cls += ' occupied';

        if (x === xMin) { cls += ' left-border'; }
        if (x === xMax) { cls += ' right-border'; }
        if (y === yMin) { cls += ' top-border'; }
        if (y === yMax) { cls += ' bottom-border'; }
        break;
      }
    }

    return cls;
  }


  constructor(
    protected facilitiesService: FacilitiesService,
    protected shipStatusService: ShipStatusService,
  ) { }


  ngOnInit(): void {
    const space = this.shipStatusService.getSpace();
    this.spaceX = (new Array(space[0]).fill(0)).reduce((acc) => {
      acc.push(acc.length);
      return acc;
    }, []);
    this.spaceY = (new Array(space[1]).fill(0)).reduce((acc) => {
      acc.push(acc.length);
      return acc;
    }, []);
    // this.facilities = this.shipStatusService.getFacilities();
    this.facilities = [
      { category: 'engine', id: 'SP1', position: [0, 0] }
    ];
    this.facilities.forEach((f) => {
      this.facilityIdMap[f.id] = this.facilitiesService.getFacilityDetailDef(
        f.category, f.id
      );
    });
  }
}
