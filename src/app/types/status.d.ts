interface Status {
  progress: ProgressStatus;
  you: YourStatus;
  env: EnvStatus;
}

interface ProgressStatus {
  distance: number;
  since: number;
}

interface YourStatus {
  health: number;
  food: number;
  water: number;
  debris: number;
}

interface EnvStatus {
  weather: string;
}


interface DispStatus {
  progress: DispProgressStatus;
  you: DispYourStatus;
  env: DispEnvStatus;
}

interface DispProgressStatus {
  days: number;
  distance: number;
}

interface DispYourStatus {
  level: number;
  healthPer: number;
  foodPer: number;
  waterPer: number;
}

interface DispEnvStatus {
  weather: string;
}


export {
  Status,
  ProgressStatus,
  YourStatus,
  EnvStatus,

  DispStatus,
  DispProgressStatus,
  DispYourStatus,
  DispEnvStatus,
}
