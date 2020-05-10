import { Injectable } from '@angular/core';
import { Karma } from 'app/types/karma';


@Injectable({
  providedIn: 'root'
})
export class KarmaService {


  // This changes the arg directly
  public turn(k: Karma): Karma {
    if (k.type === 't') {
      return this.transition(k);
    }

    if (k.type === 'l') {
      return this.lottery(k);
    }

    return k;
  }


  private transition(k: Karma): Karma {
    if (k.karma[k.index] < (k.threshold || 0)) {
      k.karma[k.index] += 1;
      return k;
    }

    const chances = this.getChances(k);
    const total = chances.reduce((acc, cur) => acc + cur);
    const rand = Math.random() * total;

    let sum = 0;
    let found = false;
    for (let i = 0; i < chances.length; i += 1) {
      sum += chances[i];
      if (!found && (sum > rand)) {
        k.index = i;
        k.karma[i] = 0;
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
    const kcs = [];

    if (k.index !== undefined) {
      k.karma.forEach((kc, idx) => {
        kcs.push(this.getKarmaCnt(k, idx));
      });

      return kcs.map((kc, idx) => {
        if ((idx === k.index - 1) || (idx === k.index) || (idx === k.index + 1)) {
          return k.chances[idx] + kc;
        }
        return 0;
      });
    }

    k.karma.forEach((v, idx) => {
      kcs.push(this.getKarmaCnt(k, idx));
    });

    return kcs.map((kc, idx) => {
      return k.chances[idx] + kc;
    });
  }


  private getKarmaCnt(k: Karma, idx: number) {
    let kc = k.karma[idx] - (k.threshold || 0);
    if (kc < 0) { kc = 0; }
    return kc;
  }


  // FIXME:
  private lottery(k: Karma): Karma {
    return k;
  }


  constructor() { }
}
