import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { FacilitiesService } from '../facilities/facilities.service';

import { Ship, StoredShip, ShipFacility } from 'app/types/ship';
import { FacilityDetailDef, Modifier } from 'app/types/facilities';

@Injectable({
  providedIn: 'root'
})
export class ShipStatusService {


  private ship: Ship;


  private facilityBuff(type: string, base = 0): number {
    let buff = base;
    let multiply = 1;

    this.ship.facilities.forEach((shipFacility) => {
      const facility = this.facilitiesService.getFacilityDetailDef(
        shipFacility.category,
        shipFacility.id
      );
      facility.effects.forEach((effect) => {
        if (!effect.modifier) { return; }
        if (effect.modifier.param !== type) { return; }
        if (effect.modifier.operator === 'plus') {
          buff += effect.modifier.value;
        }
        if (effect.modifier.operator === 'multiply') {
          multiply = multiply * effect.modifier.value;
        }
      });
    }, 0);
    return Math.floor(base * multiply) + buff;
  }


  public getWeight() {
    return this.ship.facilities.reduce((acc, cur) => {
      return acc + this.facilitiesService.getFacilityDetailDef(cur.category, cur.id).weight;
    }, 1);
  }


  public getSpeed() {
    return this.getEngine() / (1 + Math.log(this.ship.weight));
  }


  public getEngine(): number {
    return this.facilityBuff('engine', this.ship.engine);
  }


  public getSpace(): number[] {
    return JSON.parse(JSON.stringify(this.ship.space));
  }


  public getFacilities(): ShipFacility[] {
    return JSON.parse(JSON.stringify(this.ship.facilities));
  }


  // get all the facility details
  public getFacilityDetails(): FacilityDetailDef[] {
    return this.getFacilities().map((f) => {
      return this.facilitiesService.getFacilityDetailDef(f.category, f.id);
    });
  }


  // get all the facility modifiers matching the given param
  public getFacilityModifiers(modifierParam: string): Modifier[] {
    const mds = [];
    this.getFacilities().forEach((f) => {
      const fd = this.facilitiesService.getFacilityDetailDef(f.category, f.id);
      fd.effects.forEach((e) => {
        if (e.modifier.param === modifierParam) {
          mds.push(e.modifier);
        }
      });
    });
    return mds;
  }


  public addFacility(category, id, position): void {
    this.ship.facilities.push({ category, id, position });
  }


  public expandX(): void {
    this.ship.space[1] += 1;
    this.save();
  }


  public expandY(): void {
    this.ship.space[0] += 1;
    this.save();
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
      space: [2, 3],
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
