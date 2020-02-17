import { ICommandContext } from './command-context.interface';
import { IApplication } from './application.interface';
export interface ICommand {
  readonly aliases: string[];
  readonly description: string;
  readonly usage: string;
  readonly type: 'Discord' | 'Terminal';
  run: (app: IApplication, context: ICommandContext) => string;
}
