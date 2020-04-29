import { Facility } from './facilities';


interface StoredShip {
  facilities: ShipFacility[];
  space: number[]; // 1,3
  engine: number;
}


interface Ship extends StoredShip {
  speed: number; // calculated based on weight
  weight: number; // calculated number based on facility
}


interface ShipFacility extends Facility {
  position: number[];
}


export {
  StoredShip,
  Ship,
  ShipFacility,
}
