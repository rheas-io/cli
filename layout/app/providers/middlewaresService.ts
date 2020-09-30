import { ServiceProvider } from '@rheas/services';
import { InstanceHandler } from '@rheas/contracts/container';
import { MiddlewaresManager } from '../middlewares/middlewaresManager';

export class MiddlewareServiceProvider extends ServiceProvider {
    /**
     * Registers the applications middlewares manager. This is a
     * core application service and is thus immediately registered
     * when an application instance is created.
     */
    public serviceResolver(): InstanceHandler {
        return (app) => new MiddlewaresManager();
    }
}
