interface StoredPlayer {
  health: number;
  food: number;
  water: number;
  debris: number;
}


interface Player {
  level: number;
  health: number;
  food: number;
  water: number;
  debris: number;
}


interface DispPlayer {
  level: number;
  healthPer: number;
  foodPer: number;
  waterPer: number;
  debris: string;
}


export {
  StoredPlayer,
  Player,
  DispPlayer
}
