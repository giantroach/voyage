interface StoredTasks {
  activeTask: ActiveTask;
  queuedTasks: Task[];
}

interface Task {
  id: string;
  uid?: string;
  name: string;
  icon?: string;
  cost?: number;
  effort?: number;
}

interface ActiveTask extends Task {
  since: number;
  completed: number;
}

interface TaskDef extends Task {
  subTasks?: Array<TaskDef>;
}


export {
  StoredTasks,
  Task,
  ActiveTask,
  TaskDef
}
