import { IModule } from './../src/interfaces/module.interface';
import { ICommandContext } from './../src/interfaces/command-context.interface';
import { IApplication } from './../src/interfaces/application.interface';
import { ICommand } from './../src/interfaces/command.interface';
import { Application } from './../src/application';
import { Command } from '../src/decorators';
import 'reflect-metadata';

// @ts-ignore

const BabbleBot = {
  registerApplication: (app: any) => {},
};

// @ts-ignore
global.BabbleBot = BabbleBot;

/**
 * Test module
 */
class TestModule implements IModule {
  /**
   * Returns the name of the module
   * @return {string} the name of the module
   */
  getName(): string {
    return 'Test';
  }
  /**
   * Returns the version of the module
   * @return {string} the version of the module
   */
  getVersion(): string {
    return '';
  }
  /**
   * Returns the name of the module
   * @return {string} the name of the module
   */
  getAuthor(): string {
    return '';
  }

  /**
   * Command Test
   * @param {IApplication} app the application instance
   * @param {ICommandContext} cx the command context
   * @return {string} the string to send back to the server
   */
  @Command(['testCommand'], 'Test', 'test', 'Discord')
  test(app: IApplication, cx: ICommandContext) {
    return 'Test from TestModule()';
  }
}

describe('Application', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application(new TestModule());
  });

  it('Should return module from getModule', () => {
    expect(app.getModule().getName()).toBe('Test');
  });

  // eslint-disable-next-line max-len
  it('Should add a command to the commands list when you register a command', () => {
    const command = {
      aliases: ['test'],
      description: 'To Test',
      usage: 'test',
      type: 'Discord',
      run: (app: IApplication, cx: ICommandContext) => {
        return '';
      },
    } as ICommand;
    app.registerCommand(command);
    expect(((app as any).commands as ICommand[]).length).toBe(2);
    try {
      app.registerCommand(command);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('You cannot add a command twice');
    }
  });

  // eslint-disable-next-line max-len
  it('Should remove a command from the commands list when you remove a command', () => {
    const command = {
      aliases: ['test'],
      description: 'To Test',
      usage: 'test',
      type: 'Discord',
      run: (app: IApplication, cx: ICommandContext) => {
        return '';
      },
    } as ICommand;
    try {
      app.removeCommand(command);
      expect(true).toBe(false);
    } catch (e) {
      // eslint-disable-next-line quotes
      expect(e.message).toBe("Cannot remove a command that doesn't exist");
    }

    app.registerCommand(command);
    expect(((app as any).commands as ICommand[]).length).toBe(2);
    app.removeCommand(command);
    expect(((app as any).commands as ICommand[]).length).toBe(1);
  });

  it('Should dispatch a command when onDispatch is ran', () => {
    const mock = jest.fn();
    const command = {
      aliases: ['test'],
      description: 'To Test',
      usage: 'test',
      type: 'Discord',
      run: mock,
    } as ICommand;
    app.registerCommand(command);
    app.onCommandDispatched({ name: 'test', context: {} as any });
    expect(mock).toHaveBeenCalledTimes(1);
    app.onCommandDispatched({ name: 'test123', context: {} as any });
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
