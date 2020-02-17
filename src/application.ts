import { IModule } from './interfaces/module.interface';
import { IApplication } from './interfaces';
/**
 * Represents the Application for BabbleBot-Server
 */
export class Application implements IApplication {
  private module: IModule;

  /**
   * @param {IModule} module module to register to the application.
   */
  constructor(module: IModule) {
    this.module = module;
    BabbleBot.registerApplication(this);
  }
  /**
   * Register module to BabbleBot app
   * @return {IModule} instance of IModule
   */
  public getModule(): IModule {
    return this.module;
  }
}
