interface StoredTasks {
  activeTask: ActiveTask;
  queuedTasks: Task[];
}

interface Task {
  id: string;
  uid: string;
  name: string;
  icon?: string;
  cost: number;
  effort: number;
}

interface ActiveTask extends Task {
  since: number;
  completed: number;
}

////////////////////////////////

interface TaskDef {
  [key: string]: ParentTaskDef;
}

interface ParentTaskDef {
  id: string;
  name: string;
  icon: string;
  subTasks: Array<SubTaskDef | ParentTaskDef>;
}

interface SubTaskDef {
  id: string;
  name: string;
  icon: string;
  cost: number;
  effort: number;
}


export {
  StoredTasks,
  Task,
  ActiveTask,
  TaskDef,
  ParentTaskDef,
  SubTaskDef
}
