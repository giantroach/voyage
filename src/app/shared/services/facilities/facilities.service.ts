import { Injectable } from '@angular/core';

import facilityDef from './facility-def.json';
import { Facility, SubFacilityDef } from 'app/types/facilities';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {


  public getSubFacilityDef(category: string, id: string): SubFacilityDef {
    return facilityDef[category].subFacilities.find((f) => {
      return f.id === id;
    });
  }


  constructor() { }
}
