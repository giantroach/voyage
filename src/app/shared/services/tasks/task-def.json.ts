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
        id: 'F0',
        name: 'Fishing - Short',
        icon: 'fish',
        cost: 0,
        effort: 20
      },
      {
        id: 'F1',
        name: 'Fishing - Long',
        icon: 'fish',
        cost: 0,
        effort: 100
      }
    ]
  }
};

export default TypeDef;
