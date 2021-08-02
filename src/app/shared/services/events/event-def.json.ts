import { EventDef } from 'app/types/event';

const EventDef: EventDef = {
  task: {
    expand: {
      EXP_X: {
        does: [{service: 'shipStatus', method: 'expandX', args: []}]
      },
      EXP_Y: {
        does: [{service: 'shipStatus', method: 'expandY', args: []}]
      }
    },
    fishing: {
      FSH1: {
        does: [{service: 'playerStatus', method: 'feed', args: []}]
      }
    },
    build: {
      BLD_STR1: {
        does: [{service: 'shipStatus', method: 'addFacility', args: []}]
      }
    },
    rest: {
      RST1: {
        does: [{service: 'playerStatus', method: 'recover', args: []}]
      }
    }
  }
};

export default EventDef;
