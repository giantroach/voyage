import { FacilityDef } from 'app/types/facilities';

const FacilityDef: FacilityDef = {
  storage: {
    id: 'ST0',
    name: 'Storage',
    icon: 'database',
    details: [
      {
        id: 'ST1',
        name: 'Storage - Water tank',
        icon: 'database',
        weight: 10,
        size: [2, 2],
        effects: [
          {
            modifier: {
              param: 'water',
              operator: 'plus',
              value: 50,
            }
          }
        ]
      }
    ]
  },

  engine: {
    id: 'SP0',
    name: 'Speed',
    icon: 'tachometerAlt',
    details: [
      {
        id: 'SP1',
        name: 'Speed - Mast',
        icon: 'database',
        weight: 10,
        size: [1, 3],
        effects: [
          {
            modifier: {
              param: 'engine',
              operator: 'plus',
              value: 1,
            }
          }
        ]
      }
    ]
  }
};

export default FacilityDef;
