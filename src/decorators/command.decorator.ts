import { ICommandContext } from './../interfaces/command-context.interface';
import { IApplication } from './../interfaces/application.interface';
import { ICommand } from './../interfaces/command.interface';
import { IModule } from './../interfaces/module.interface';
/**
 * Command decorator
 * @param {string[]} aliases aliases used for the command
 * @param {string} description the description of the command
 * @param {string} usage the usuage for the command
 * @param {string} type either Discord or Terminal
 * @return {CallableFunction} the decorator function
 */
export function Command(
  aliases: string[],
  description: string,
  usage: string,
  type: 'Terminal' | 'Discord',
): CallableFunction {
  return function(
    target: IModule,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): any {
    const commands: ICommand[] = Reflect.getMetadata('commands', target) || [];
    const newCommand: ICommand = {
      aliases,
      description,
      usage,
      type,
      run: (app: IApplication, context: ICommandContext) =>
        (target[propertyKey] as (
          app: IApplication,
          cx: ICommandContext,
        ) => string).call(target, app, context),
    };
    commands.push(newCommand);
    Reflect.defineMetadata('commands', commands, target);
  };
}
