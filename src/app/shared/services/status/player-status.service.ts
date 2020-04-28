import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { JourneyStatusService } from './journey-status.service';
import * as moment from 'moment';

import { Player, StoredPlayer, DispPlayer } from 'app/types/player';

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
    return Math.ceil((Math.log(this.level) + 1) * 100);
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
    // TODO: emit event;
  }


  public feed(food: number): void {
    this.player.food += food;
    if (this.player.food > 200) {
      this.player.food = 200;
    }
    // TODO: emit event;
  }


  public drink(): void {
    if (this.player.water > 0) {
      this.player.water -= 0.1;
    }  else {
      this.suffer(0.2);
    }
    // TODO: emit event;
  }


  public suffer(pain: number): void {
    this.player.health -= pain;
    if (this.player.health <= 0) {
      this.player.health = 0;
      // TODO: game over
    }
  }


  public tack(m: moment.Moment) {
    this.level = this.getLevel();
    this.eat();
    this.drink();
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
    protected journeyStatus: JourneyStatusService
  ) { }

}
