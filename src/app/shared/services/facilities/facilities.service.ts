import { Injectable } from '@angular/core';

import facilityDef from './facility-def.json';
import { Facility, FacilityDetailDef } from 'app/types/facilities';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {


  public getFacilityDetailDef(category: string, id: string): FacilityDetailDef {
    return facilityDef[category].details.find((f) => {
      return f.id === id;
    });
  }


  constructor() { }
}
