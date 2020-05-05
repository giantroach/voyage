import { Injectable } from '@angular/core';

import facilityDef from './facility-def.json';
import { Facility, FacilityDef, FacilityDetailDef } from 'app/types/facilities';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {


  public getFacilityDef(): FacilityDef {
    return JSON.parse(JSON.stringify(facilityDef));
  }


  public getFacilityDetailDef(category: string, id: string): FacilityDetailDef {
    return facilityDef[category].details.find((f) => {
      return f.id === id;
    });
  }


  constructor() { }
}
