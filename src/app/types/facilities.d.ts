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
  description: string;
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
  operator?: string; // plus (default) / multiply
  value: number;
  when?: EffectCondition;
}


interface EffectCondition {
  status: string; // e.g. weather player etc.
  method: string; // isRaining
  params?: any[];
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
  EffectCondition,
  Modifier,
  Special
}
