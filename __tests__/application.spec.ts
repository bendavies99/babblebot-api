import { ICommandContext } from './../src/interfaces/command-context.interface';
import { IApplication } from './../src/interfaces/application.interface';
import { ICommand } from './../src/interfaces/command.interface';
import { Application } from './../src/application';

// @ts-ignore

const BabbleBot = {
  registerApplication: (app: any) => {},
};

// @ts-ignore
global.BabbleBot = BabbleBot;

describe('Application', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application({ name: 'Test' });
  });

  it('Should return module from getModule', () => {
    expect(app.getModule()).toMatchObject({ name: 'Test' });
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
    expect(((app as any).commands as ICommand[]).length).toBe(1);
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
    expect(((app as any).commands as ICommand[]).length).toBe(1);
    app.removeCommand(command);
    expect(((app as any).commands as ICommand[]).length).toBe(0);
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
