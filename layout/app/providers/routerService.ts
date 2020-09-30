import { IRouter } from '@rheas/contracts/routes';
import { RouterServiceProvider as BaseService } from '@rheas/routing/routerServiceProvider';

export class RouteServiceProvider extends BaseService {
    /**
     * Register the application routes in here. The base service creates
     * and registers the router service and exposes a protected `router`
     * variable in this class. All that this class has to do is to register the
     * api, web and any other routes on to the router.
     *
     * The router is registered on the application container, so this also has
     * access to application instance in a protected `container` variable.
     */
    protected registerRoutesOnRouter(): void {
        this.router.registerRoutes();
    }
}
