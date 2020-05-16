import { StoredTasks } from './tasks'

interface Storage {
  tasks?: string;
  ticks?: string;
  log?: string;
  weather?: string;
}

export {
  Storage
}
