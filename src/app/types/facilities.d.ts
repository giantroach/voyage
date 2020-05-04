interface Facility {
  id: string;
  category: string;
}


////////////////////////////////

interface FacilityDef {
  [category: string]: FacilityCategoryDef;
}


interface FacilityCategoryDef {
  id: string;
  name: string;
  icon: string;
  details: Array<FacilityDetailDef>;
}


interface FacilityDetailDef {
  id: string;
  name: string;
  icon: string;
  weight: number;
  size: number[];
  effects: Array<Effect>;
}


interface Effect {
  modifier?: Modifier;
  special?: Special;
}


interface Modifier {
  param: string;
  operator: string; // plus / multiply
  value: number;
}


interface Special {
  id: string;
}


export {
  Facility,
  FacilityDef,
  FacilityCategoryDef,
  FacilityDetailDef,
  Effect,
  Modifier,
  Special
}
