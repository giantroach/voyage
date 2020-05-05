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
  params?: any;
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
  visible: boolean;
  subTasks: Array<SubTaskDef>;
}

interface SubTaskDef {
  id: string;
  name: string;
  icon: string;
  cost: number;
  effort: number;
  params?: any;
}


export {
  StoredTasks,
  Task,
  ActiveTask,
  TaskDef,
  ParentTaskDef,
  SubTaskDef
}
