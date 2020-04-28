import { EventDef } from 'app/types/event';

const EventDef: EventDef = {
  task: {
    F1: {
      does: [{service: 'playerStatus', method: 'feed', args: [5]}]
    }
  }
};

export default EventDef;
