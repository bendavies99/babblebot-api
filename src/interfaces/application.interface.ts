import { IModule } from './module.interface';

/**
 * This is the main application interface that gets sent to the server
 */
export interface IApplication {
  /**
   * Return a module to register
   */
  getModule: () => IModule;
}
