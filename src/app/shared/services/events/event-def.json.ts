import { EventDef } from 'app/types/event';

const EventDef: EventDef = {
  task: {
    F1: {
      does: [{service: 'playerStatus', method: 'feed', args: [5]}]
    },
    F2: {
      does: [{service: 'playerStatus', method: 'feed', args: [10]}]
    }
  },
  rest: {
    R1: {
      does: [{service: 'playerStatus', method: 'recover', args: [10]}]
    },
    R2: {
      does: [{service: 'playerStatus', method: 'recover', args: [100]}]
    }
  }
};

export default EventDef;
