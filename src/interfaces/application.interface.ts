import { ICommand } from './command.interface';
import { ICommandDispatchedEvent } from './command-dispatched-event.interface';
import { IModule } from './module.interface';

/**
 * This is the main application interface that gets sent to the server
 */
export interface IApplication {
  /**
   * Return a module to register
   */
  getModule: () => IModule;
  /**
   * Register command to the app
   * @param {ICommand} command command to register
   */
  registerCommand: (command: ICommand) => void;
  /**
   * Remove command from the app
   * @param {ICommand} command command to remove
   */
  removeCommand: (command: ICommand) => void;
  /**
   * call this when a command is dispatched from the Server
   * @param {ICommandDispatchedEvent} event the command
   * @return {String} the value to send back to the user.
   */
  onCommandDispatched: (event: ICommandDispatchedEvent) => string;
}
