import mitt from 'mitt';
import {SupportedKeys} from './SupportedKeys';
import {RemoteControlManagerInterface} from './RemoteControlManager.interface';

class RemoteControlManager implements RemoteControlManagerInterface {
  private eventEmitter = mitt<{keyDown: SupportedKeys}>();

  addKeydownListener = (
    listener: (event: SupportedKeys) => void,
  ): ((event: SupportedKeys) => void) => {
    this.eventEmitter.on('keyDown', listener);
    return listener;
  };

  removeKeydownListener = (listener: (event: SupportedKeys) => void): void => {
    this.eventEmitter.off('keyDown', listener);
  };

  emitKeyDown = (key: SupportedKeys): void => {
    this.eventEmitter.emit('keyDown', key);
  };
}

export default new RemoteControlManager();
