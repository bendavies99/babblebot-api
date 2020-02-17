export interface ICommandContext {
  getParameter(name: string): string;
  hasParameter(name: string): boolean;
  getCommandName(): string;
  getValue(): string;
  getType(): 'Discord' | 'Terminal';
  getMessage(): any;
}
