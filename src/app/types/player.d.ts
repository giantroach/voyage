interface StoredPlayer {
  health: number;
  food: number;
  water: number;
}


interface Player {
  level: number;
  health: number;
  food: number;
  water: number;
}


interface DispPlayer {
  level: number;
  healthPer: number;
  foodPer: number;
  waterPer: number;
}


export {
  StoredPlayer,
  Player,
  DispPlayer
}
