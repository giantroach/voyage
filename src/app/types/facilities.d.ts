interface Facility {
  id: string;
  category: string;
}


////////////////////////////////

interface FacilityDef {
  [category: string]: ParentFacilityDef;
}


interface ParentFacilityDef {
  id: string;
  name: string;
  icon: string;
  subFacilities: Array<SubFacilityDef>;
}


interface SubFacilityDef {
  id: string;
  name: string;
  icon: string;
  weight: number;
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
  ParentFacilityDef,
  SubFacilityDef,
  Effect,
  Modifier,
  Special
}
