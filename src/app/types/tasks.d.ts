interface StoredTasks {
  activeTask: ActiveTask;
  queuedTasks: Task[];
}

interface Task {
  id: string;
  category: string;
  uid: string;
  name: string;
  icon?: string;
  cost: number;
  effort: number;
  params?: any;
  args?: Array<any>;
}

interface ActiveTask extends Task {
  since: number;
  completed: number;
}

////////////////////////////////

interface TaskDef {
  [category: string]: TaskCategoryDef;
}

interface TaskCategoryDef {
  id: string;
  name: string;
  icon: string;
  visible: boolean;
  subTasks: Array<TaskDetailDef>;
}

interface TaskDetailDef {
  id: string;
  name: string;
  icon: string;
  cost: number;
  effort: number;
  args?: Array<any>; // args for event resolver
  params?: any; // params for logics
}


export {
  StoredTasks,
  Task,
  ActiveTask,
  TaskDef,
  TaskCategoryDef,
  TaskDetailDef
}
