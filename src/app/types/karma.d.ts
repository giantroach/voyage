interface Karma {
  chances: KarmaChances;
  index?: number;
  karma: number[];
}


// eg1. [6, 3, 1]
// index 1 may appear 60%
// index 2 may appear 30%
//
// eg1. [[2, 3], [[1, 2], [3, 3]]]
// index 1 may transit 2 or 3 by 50% / 50% chance ([[2, 1], [3, 1]]).
// index 2 may transit 1 or 3 by 40% / 60% chance.
type KarmaChances = number[] | KarmaChances[];


export {
  Karma,
  KarmaChances
}
