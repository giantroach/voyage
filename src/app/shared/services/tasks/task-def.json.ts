import { TaskDef } from 'app/types/tasks';

const TypeDef: TaskDef = {
  build: {
    id: 'B0',
    name: 'Build',
    icon: 'cog',
    visible: false,
    subTasks: [
      {
        id: 'ST1',
        name: 'Build - Water tank',
        icon: 'database',
        cost: 100,
        effort: 1,
        args: ['storage', 'ST1']
      },
      {
        id: 'SP1',
        name: 'Build - Mast',
        icon: 'tachometerAlt',
        cost: 100,
        effort: 100,
        args: ['engine', 'SP1']
      },
    ]
  },
  expand: {
    id: 'E0',
    name: 'Expand',
    icon: 'arrowsAlt',
    visible: false,
    subTasks: [
      {
        id: 'E1',
        name: 'Expand - Vertical',
        icon: 'arrowsAltV',
        cost: null,
        effort: null,
        params: { direction: 'Y' }
      },
      {
        id: 'E2',
        name: 'Expand - Horizontal',
        icon: 'arrowsAltH',
        cost: null,
        effort: null,
        params: { direction: 'X' }
      },
    ]
  },
  fishing: {
    id: 'F0',
    name: 'Fishing',
    icon: 'fish',
    visible: true,
    subTasks: [
      {
        id: 'F1',
        name: 'Fishing - Short',
        icon: 'fish',
        cost: 0,
        effort: 1,
        args: [5]
      },
      {
        id: 'F2',
        name: 'Fishing - Long',
        icon: 'fish',
        cost: 0,
        effort: 100,
        args: [10]
      }
    ]
  },
  rest: {
    id: 'R0',
    name: 'Rest',
    icon: 'bed',
    visible: true,
    subTasks: [
      {
        id: 'R1',
        name: 'Rest - Short',
        icon: 'bed',
        cost: 0,
        effort: 1,
        args: [5]
      },
      {
        id: 'R2',
        name: 'Rest - Long',
        icon: 'bed',
        cost: 0,
        effort: 1000,
        args: [50]
      }
    ]
  }
};

export default TypeDef;
