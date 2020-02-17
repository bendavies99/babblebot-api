/**
 * This types is implemented by the J2V8 Bindings
 * See BabbleBot-Server for implementation details.
 */
import { IApplication } from '../interfaces/application.interface';
// eslint-disable-next-line no-unused-vars
declare global {
  namespace BabbleBot {
    function registerApplication(app: IApplication): void;
  }
}
