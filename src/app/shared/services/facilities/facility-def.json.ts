import { FacilityDef } from 'app/types/facilities';

const FacilityDef: FacilityDef = {
  storage: {
    id: 'ST0',
    name: 'Storage',
    icon: 'database',
    details: [
      {
        id: 'ST1',
        name: 'Storage - Open water tank',
        description: '',
        icon: 'database',
        weight: 10,
        size: [2, 2],
        effects: [
          {
            modifier: {
              param: 'waterMax',
              value: 20,
            }
          },
          {
            modifier: {
              param: 'water',
              when: {
                status: 'weather',
                method: 'is',
                params: [2]
              },
              value: 3,
            }
          },
          {
            modifier: {
              param: 'water',
              when: {
                status: 'weather',
                method: 'is',
                params: [0]
              },
              value: -0.1,
            }
          }
        ]
      }
    ]
  },

  engine: {
    id: 'SP0',
    name: 'Engine',
    icon: 'tachometerAlt',
    details: [
      {
        id: 'SP1',
        name: 'Speed - Mast',
        description: '',
        icon: 'tachometerAlt',
        weight: 10,
        size: [1, 3],
        effects: [
          {
            modifier: {
              param: 'engine',
              value: 1,
            }
          }
        ]
      }
    ]
  }
};

export default FacilityDef;
