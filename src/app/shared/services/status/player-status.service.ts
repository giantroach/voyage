import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { JourneyStatusService } from './journey-status.service';
import { ShipStatusService } from './ship-status.service';
import { WeatherStatusService } from './weather-status.service';
import * as moment from 'moment';

import { Player, StoredPlayer, DispPlayer } from 'app/types/player';
import { EffectCondition } from 'app/types/facilities';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatusService {

  private player: Player = null;
  private level: number = null;


  private getLevel(): number {
    const journey = this.journeyStatus.getJourney();
    const lv = Math.floor(
      journey.distance / 20
        * Math.log((Number(new Date()) - journey.since) / 1000)
    ) + 1;
    return lv < 100 ? lv : 100;
  }


  private getMaxHealth(): number {
    return Math.ceil((Math.log(this.level) + 1) * 100);
  }


  private getMaxFood(): number {
    return Math.ceil((Math.log(this.level) + 1) * 100);
  }


  private getMaxWater(): number {
    let max = Math.ceil((Math.log(this.level) + 1) * 100);
    const mds = this.shipStatus.getFacilityModifiers('waterMax');
    mds.forEach((md) => {
      if (md.when && !this.isEffectConditionMatched(md.when)) { return; }
      max += md.value;
    });
    return max;
  }


  public getEfficiency(): number {
    // TODO: consider health, food and water
    return Math.log(this.level) + 1;
  }


  public getDispStatus(): DispPlayer {
    return {
      level: this.level,
      healthPer: Number((this.player.health / (this.getMaxHealth())).toFixed(2)),
      foodPer: Number((this.player.food / (this.getMaxFood())).toFixed(2)),
      waterPer: Number((this.player.water / (this.getMaxWater())).toFixed(2)),
    };
  }


  public eat(): void {
    if (this.player.food > 0) {
      this.player.food -= 0.1;
    }  else {
      this.suffer(0.1);
    }
  }


  public feed(food: number): void {
    const max = this.getMaxFood() * 1.5;
    this.player.food += food;
    if (this.player.food > max) {
      this.player.food = max;
    }
  }


  public water(water: number): void {
    const max = this.getMaxWater() * 1.5;
    this.player.water += water;
    if (this.player.water > max) {
      this.player.water = max;
    }
  }


  public adjustWater(): void {
    // Adjust from facilities
    // TODO: This should be cached and make it faster
    const mds = this.shipStatus.getFacilityModifiers('water');
    mds.forEach((md) => {
      if (md.when && !this.isEffectConditionMatched(md.when)) { return; }
      this.water(md.value);
    });

    // Adjust from player drinking
    if (this.player.water > 0) {
      this.player.water -= 0.1;
    }  else {
      this.suffer(0.2);
    }
  }


  public isEffectConditionMatched(c: EffectCondition): boolean {
    switch (c.status) {
      case 'weather':
        return this.weatherStatus[c.method].apply(
          this.weatherStatus, c.params || null);
    }
    return false;
  }


  public suffer(pain: number): void {
    this.player.health -= pain;
    if (this.player.health <= 0) {
      this.player.health = 0;
      // TODO: game over
    }
  }


  public recover(health: number): void {
    this.player.health += health;
    if (this.player.health > this.getMaxHealth() * 1.5) {
      this.player.health = 200;
    }
  }


  public tack(m: moment.Moment) {
    this.level = this.getLevel();
    this.eat();
    this.adjustWater();
  }


  public reset(): void {
    this.storage.reset('player');
    this.init();
  }


  public save() {
    this.storage.save<StoredPlayer>('player', {
      health: this.player.health,
      food: this.player.food,
      water: this.player.water,
    });
  }


  public load() {
    const stored = this.storage.get<Player>('player') || {
      health: 100,
      food: 100,
      water: 100,
    };

    this.level = this.getLevel();
    this.player = Object.assign({
      level: this.level
    }, stored);
  }


  public init() {
    this.load();
  }


  constructor(
    protected storage: StorageService,
    protected journeyStatus: JourneyStatusService,
    protected shipStatus: ShipStatusService,
    protected weatherStatus: WeatherStatusService,
  ) { }

}
