import { TaskDef } from 'app/types/tasks';

const TypeDef: TaskDef = {
  build: {
    id: 'BLD',
    name: 'Build',
    icon: 'cog',
    visible: false,
    subTasks: [
      {
        id: 'BLD_STR1',
        command: 'BLD_STR1',
        name: 'Build - Water tank',
        icon: 'database',
        cost: 100,
        effort: 1,
        args: ['storage', 'ST1']
      },
      {
        id: 'BLD_SPC1',
        command: 'BLD_SPC1',
        name: 'Build - Mast',
        icon: 'tachometerAlt',
        cost: 100,
        effort: 100,
        args: ['engine', 'SP1']
      },
    ]
  },
  expand: {
    id: 'EXP',
    name: 'Expand',
    icon: 'arrowsAlt',
    visible: false,
    subTasks: [
      {
        id: 'EXP_Y',
        command: 'EXP_Y',
        name: 'Expand - Vertical',
        icon: 'arrowsAltV',
        cost: null,
        effort: null,
        params: { direction: 'Y' }
      },
      {
        id: 'EXP_X',
        command: 'EXP_X',
        name: 'Expand - Horizontal',
        icon: 'arrowsAltH',
        cost: null,
        effort: null,
        params: { direction: 'X' }
      },
    ]
  },
  fishing: {
    id: 'FSH',
    name: 'Fishing',
    icon: 'fish',
    visible: true,
    subTasks: [
      {
        id: 'FSH1',
        command: 'FSH1',
        name: 'Fishing - Short',
        icon: 'fish',
        cost: 0,
        effort: 1,
        args: [5]
      },
      {
        id: 'FSH2',
        command: 'FSH2',
        name: 'Fishing - Long',
        icon: 'fish',
        cost: 0,
        effort: 100,
        args: [10]
      }
    ]
  },
  rest: {
    id: 'RST',
    name: 'Rest',
    icon: 'bed',
    visible: true,
    subTasks: [
      {
        id: 'RST1',
        command: 'RST1',
        name: 'Rest - Short',
        icon: 'bed',
        cost: 0,
        effort: 1,
        args: [5]
      },
      {
        id: 'RST2',
        command: 'RST2',
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
