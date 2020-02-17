import { ICommandContext } from './command-context.interface';
export interface ICommandDispatchedEvent {
  name: string;
  context: ICommandContext;
}
