import { Injectable } from '@angular/core';

import { Storage } from 'app/types/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: any; // Storage


  public init() {
    // TODO: encrypt / decrypt
    this.storage = localStorage || {};
  }


  public get<T>(key: string): T {
    return JSON.parse(this.storage[key] || '{}');
  }


  public save<T>(key: string, val: T): void {
    const strVal = JSON.stringify(val);
    this.storage[key] = strVal;
    localStorage[key] = strVal;
  }


  constructor() {
  }
}
