/**
 * Module interface for creating modules
 */
export interface IModule {
  getName(): string;
  getVersion(): string;
  getAuthor(): string;
}
