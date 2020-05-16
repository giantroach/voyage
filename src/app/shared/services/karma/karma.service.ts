import { Injectable } from '@angular/core';
import { Karma, KarmaChances } from 'app/types/karma';


@Injectable({
  providedIn: 'root'
})
export class KarmaService {


  // This changes the arg directly
  public turn(k: Karma): Karma {
    const chances = this.getChances(k);
    const total = chances.reduce((acc, cur) => acc + cur);
    const rand = Math.random() * total;

    let sum = 0;
    let found = false;
    for (let i = 0; i < chances.length; i += 1) {
      sum += chances[i];
      if (!found && (sum > rand)) {
        k.index = i;
        k.karma[i] = this.getReducedKarma(k.karma[i]);
        found = true;

      } else {
        if (chances[i]) { // exclude chance === 0
          k.karma[i] += 1;
        }
      }
    }

    return k;
  }


  private getChances(k: Karma): number[] {
    const kcs = new Array(k.karma.length).fill(0);

    if (k.index === undefined) {
      kcs.forEach((kc, idx) => {
        kcs[idx] += (k.karma[idx] + (k.chances[idx] as number));
      });

      return kcs;
    }

    // transition mode, i.e. index !== undefined
    (k.chances[k.index] as KarmaChances).forEach((c) => {
      if (Array.isArray(c)) {
        kcs[c[0]] = c[1];

      } else {
        kcs[c] = 1;
      }
    });

    kcs.forEach((kc, idx) => {
      if (kc !== 0) {
        kcs[idx] += k.karma[idx];
      }
    });

    return kcs;
  }


  private getReducedKarma(kCnt: number) {
    return Math.floor(kCnt / 2);
  }


  constructor() { }
}
