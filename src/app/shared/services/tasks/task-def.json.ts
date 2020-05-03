import { TaskDef } from 'app/types/tasks';

const TypeDef: TaskDef = {
  build: {
    id: 'B0',
    name: 'Build',
    icon: 'cog',
    visible: false,
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
    visible: true,
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
