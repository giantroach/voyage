import { TaskDef } from 'app/types/tasks';

const TypeDef: TaskDef = {
  build: {
    id: 'B0',
    name: 'Build',
    icon: 'cog',
    subTasks: [
      {
        id: 'B1',
        name: 'Build - Storage',
        icon: 'cog',
        cost: 100,
        effort: 100
      },
      {
        id: 'B2',
        name: 'Build - Mast',
        icon: 'cog',
        cost: 100,
        effort: 100
      },
    ]
  },
  fishing: {
    id: 'F0',
    name: 'Fishing',
    icon: 'fish',
    subTasks: [
      {
        id: 'F1',
        name: 'Fishing - Short',
        icon: 'fish',
        cost: 0,
        effort: 1
      },
      {
        id: 'F2',
        name: 'Fishing - Long',
        icon: 'fish',
        cost: 0,
        effort: 100
      }
    ]
  },
  rest: {
    id: 'R0',
    name: 'Rest',
    icon: 'bed',
    subTasks: [
      {
        id: 'R1',
        name: 'Rest - Short',
        icon: 'bed',
        cost: 0,
        effort: 100
      },
      {
        id: 'R2',
        name: 'Rest - Long',
        icon: 'bed',
        cost: 0,
        effort: 1000
      }
    ]
  }
};

export default TypeDef;
