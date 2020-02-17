// eslint-disable-next-line max-len
import { ICommandContext } from './../../src/interfaces/command-context.interface';
import { IApplication } from './../../src/interfaces/application.interface';
import { IModule } from './../../src/interfaces/module.interface';
import { Command } from './../../src/decorators/command.decorator';
import { ICommand } from '../../src';
import 'reflect-metadata';

/**
 * Test module
 */
class TestModule implements IModule {
  /**
   * Returns the name of the module
   * @return {string} the name of the module
   */
  getName(): string {
    return '';
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
  @Command(['test'], 'Test', 'test', 'Discord')
  test(app: IApplication, cx: ICommandContext) {
    return 'Test from TestModule()';
  }
}

describe('@Command', () => {
  it('Should add command to metadata', () => {
    const module = new TestModule();
    const commands: ICommand[] = Reflect.getMetadata('commands', module);
    expect(commands.length).toBe(1);
    expect(commands[0].run(undefined, undefined)).toBe(
      'Test from TestModule()',
    );
  });
});
