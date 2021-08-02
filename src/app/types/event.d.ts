interface Event {
  category: string;
  subCategory: string;
  command: string;
  args?: any[];
}


interface EventDef {
  [category: string]: TypeDef;
}


interface TypeDef {
  [subCategory: string]: CommandDef;
}

interface CommandDef {
  [command: string]: IDDef;
}

interface IDDef {
  does: Array<TaskDef>;
}


interface TaskDef {
  service: string;
  method: string;
  args: Array<any>;
}


export {
  Event,
  EventDef
}
