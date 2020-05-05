import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() newFacilitySize: number[] = null;
  @Output() selectLocation = new EventEmitter<number[]>();


  public space: Cell[][];
  public facilities: ShipFacility[];
  public facilityIdMap: {[id: string]: FacilityDetailDef} = {};
  private prevHighlight: number[] = [];


  public getCell(x: number, y: number): Cell {
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


  public highlight(x: number, y: number) {
    const w = this.newFacilitySize[0];
    const h = this.newFacilitySize[1];
    const yMax = this.space.length;
    const xMax = this.space[0].length;
    let outOfBoundery = false;

    if (yMax < y + h || xMax < x + w) {
      outOfBoundery = true;
    }

    for (let i = y; i < y + h && i < yMax; i += 1) {
      for (let j = x; j < x + w && j < xMax; j += 1) {
        const cell = this.space[i][j];
        if (outOfBoundery) {
          cell.cls += ' collision';
          continue;
        }

        if (cell.occupied) {
          cell.cls += ' collision';
        } else {
          cell.cls += ' highlight';
        }
      }
    }
    this.prevHighlight = [x, y];
  }


  public dehighlight(x: number, y: number) {
    const w = this.newFacilitySize[0];
    const h = this.newFacilitySize[1];
    const yMax = this.space.length;
    const xMax = this.space[0].length;

    for (let i = y; i < y + h && i < yMax; i += 1) {
      for (let j = x; j < x + w && j < xMax; j += 1) {
        const cell = this.space[i][j];
        cell.cls = cell.cls.replace(/ collision| highlight/, '');
      }
    }
  }


  public selectNewFacilityLocation(x: number, y: number): void {
    const w = this.newFacilitySize[0];
    const h = this.newFacilitySize[1];
    const yMax = this.space.length;
    const xMax = this.space[0].length;

    if (yMax < y + h || xMax < x + w) {
      return; // out of boundary
    }

    for (let i = y; i < y + h && i < yMax; i += 1) {
      for (let j = x; j < x + w && j < xMax; j += 1) {
        const cell = this.space[i][j];
        if (cell.occupied) {
          return; // collision
        }
      }
    }
    this.selectLocation.emit([x, y]);
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
