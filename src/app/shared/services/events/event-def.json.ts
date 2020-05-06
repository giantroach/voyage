import { EventDef } from 'app/types/event';

const EventDef: EventDef = {
  task: {
    E1: {
      does: [{service: 'shipStatus', method: 'expandX', args: []}]
    },
    E2: {
      does: [{service: 'shipStatus', method: 'expandY', args: []}]
    },
    fishing: {
      does: [{service: 'playerStatus', method: 'feed', args: []}]
    },
    build: {
      does: [{service: 'shipStatus', method: 'addFacility', args: []}]
    },
    rest: {
      does: [{service: 'playerStatus', method: 'recover', args: []}]
    }
  }
};

export default EventDef;
