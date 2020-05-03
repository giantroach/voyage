import { Component, OnInit, Input } from '@angular/core';
import { ShipStatusService } from 'app/shared/services/status/ship-status.service';
import { ShipFacility } from 'app/types/ship';

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


  constructor(
    protected shipStatusService: ShipStatusService
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
    this.facilities = this.shipStatusService.getFacilities();
  }
}
