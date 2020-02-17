// eslint-disable-next-line max-len
import { ICommandDispatchedEvent } from './interfaces/command-dispatched-event.interface';
import { ICommand } from './interfaces/command.interface';
import { IModule } from './interfaces/module.interface';
import { IApplication } from './interfaces';
/**
 * Represents the Application for BabbleBot-Server
 */
export class Application implements IApplication {
  private module: IModule;

  private commands: ICommand[];

  /**
   * @param {IModule} module module to register to the application.
   */
  constructor(module: IModule) {
    this.module = module;
    this.commands = [];
    BabbleBot.registerApplication(this);
  }
  /**
   * Register module to BabbleBot app
   * @return {IModule} instance of IModule
   */
  public getModule(): IModule {
    return this.module;
  }

  /**
   * Register command to the app
   * @param {ICommand} command command to register
   */
  public registerCommand(command: ICommand) {
    if (this.commands.indexOf(command) !== -1) {
      throw new Error('You cannot add a command twice');
    } else {
      this.commands.push(command);
    }
  }
  /**
   * Remove command from the app
   * @param {ICommand} command command to remove
   */
  public removeCommand(command: ICommand) {
    if (this.commands.indexOf(command) === -1) {
      // eslint-disable-next-line quotes
      throw new Error("Cannot remove a command that doesn't exist");
    } else {
      this.commands = this.commands.filter((c: ICommand) => c !== command);
    }
  }
  /**
   * call this when a command is dispatched from the Server
   * @param {ICommandDispatchedEvent} event the command
   * @return {String} the value to send back to the user.
   */
  public onCommandDispatched(event: ICommandDispatchedEvent): string {
    const foundCommand = this.commands.filter(
      (c: ICommand) => c.aliases.indexOf(event.name) !== -1,
    );
    let command: ICommand;
    if (foundCommand.length > 0) {
      command = foundCommand[0];
      return command.run(this, event.context);
    }

    return 'Command not found!';
  }
}
