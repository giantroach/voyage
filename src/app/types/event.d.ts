interface Event {
  id: string;
  type: string;
}


interface EventDef {
  [type: string]: TypeDef;
}


interface TypeDef {
  [id: string]: IDDef;
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
