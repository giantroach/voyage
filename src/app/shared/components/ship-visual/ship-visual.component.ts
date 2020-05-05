import { Component, OnInit, Input } from '@angular/core';
import { FacilitiesService, ShipStatusService } from 'app/shared/services/';
import { ShipFacility } from 'app/types/ship';
import { FacilityDetailDef } from 'app/types/facilities';


interface Cell {
  occupied: boolean;
  cls: string;
}

@Component({
  selector: 'vy-ship-visual',
  templateUrl: './ship-visual.component.html',
  styleUrls: ['./ship-visual.component.scss']
})
export class ShipVisualComponent implements OnInit {


  @Input() expandX = false;
  @Input() expandY = false;


  public space: Cell[][];
  public facilities: ShipFacility[];
  public facilityIdMap: {[id: string]: FacilityDetailDef} = {};


  public getCell(x, y): Cell {
    const cell = { occupied: false, cls: '' };
    const fs = this.facilities;

    for (const f of fs) {
      const fd = this.facilityIdMap[f.id];
      const pos = f.position;
      const xMin = pos[0];
      const xMax = pos[0] + fd.size[0] - 1;
      const yMin = pos[1];
      const yMax = pos[1] + fd.size[1] - 1;

      if ((x >= xMin) && (x <= xMax) && (y >= yMin) && (y <= yMax)) {
        cell.occupied = true;

        if (x === xMin) { cell.cls += ' left-border'; }
        if (x === xMax) { cell.cls += ' right-border'; }
        if (y === yMin) { cell.cls += ' top-border'; }
        if (y === yMax) { cell.cls += ' bottom-border'; }

        break;
      }
    }

    return cell;
  }


  constructor(
    protected facilitiesService: FacilitiesService,
    protected shipStatusService: ShipStatusService,
  ) { }


  ngOnInit(): void {
    // this.facilities = this.shipStatusService.getFacilities();
    this.facilities = [
      { category: 'engine', id: 'SP1', position: [1, 0] }
    ];
    this.facilities.forEach((f) => {
      this.facilityIdMap[f.id] = this.facilitiesService.getFacilityDetailDef(
        f.category, f.id
      );
    });

    const space = this.shipStatusService.getSpace();
    this.space = (new Array(space[0]).fill(0)).reduce((acc1) => {
      acc1.push((new Array(space[1]).fill(0)).reduce((acc2) => {
        acc2.push(this.getCell(acc2.length, acc1.length));
        return acc2;
      }, []));
      return acc1;
    }, []);
  }
}
