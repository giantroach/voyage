import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { FacilitiesService } from '../facilities/facilities.service';

import { Ship, StoredShip, ShipFacility } from 'app/types/ship';

@Injectable({
  providedIn: 'root'
})
export class ShipStatusService {


  private ship: Ship;


  public getWeight() {
    return this.ship.facilities.reduce((acc, cur) => {
      return acc + this.facilitiesService.getSubFacilityDef(cur.category, cur.id).weight;
    }, 1);
  }


  public getSpeed() {
    return this.ship.engine / (1 + Math.log(this.ship.weight));
  }


  public getSpace(): number[] {
    return this.ship.space;
  }


  public getFacilities(): ShipFacility[] {
    return this.ship.facilities;
  }


  public reset(): void {
    this.storage.reset('ship');
    this.init();
  }


  public save() {
    this.storage.save<StoredShip>('ship', {
      facilities: this.ship.facilities,
      space: this.ship.space,
      engine: this.ship.engine
    });
  }


  public load() {
    const stored = this.storage.get<StoredShip>('ship') || {
      facilities: [],
      space: [2, 10],
      engine: 10
    };

    this.ship = Object.assign({
      weight: 0,
      speed: 0
    }, stored);
    this.ship.weight = this.getWeight();
    this.ship.speed = this.getSpeed();
  }


  public init() {
    this.load();
  }


  constructor(
    protected storage: StorageService,
    protected facilitiesService: FacilitiesService
  ) { }

}
