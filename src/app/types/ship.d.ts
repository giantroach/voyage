import { Facility } from './facilities';


interface StoredShip {
  facilities: Facility[];
  space: number[]; // 1,3
  engine: number;
}


interface Ship extends StoredShip {
  speed: number; // calculated based on weight
  weight: number; // calculated number based on facility
}


export {
  StoredShip,
  Ship,
}
