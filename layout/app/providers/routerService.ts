import { Route } from '@rheas/routing';
import ApiRoutes from '../../routes/api';
import WebRoutes from '../../routes/web';
import { RouterServiceProvider as BaseService } from '@rheas/routing/routerServiceProvider';

export class RouterServiceProvider extends BaseService {
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
        this.registerWebRoutes();
        this.registerApiRoutes();
    }

    /**
     * Registers the application web page routes on the router. All request to web
     * routes will run through the `web` middleware group - which is a collection of
     * middlewares like `SessionStart`, `VerifyCSRF` etc.
     */
    protected registerWebRoutes() {
        const webRoutes = Route.group()
            .middleware('web')
            .routes(...WebRoutes);

        this.router.registerRoutes(webRoutes);
    }

    /**
     * Register the api routes in here. The route group is prefixed with `/api` so the
     * routes in `/routes/api` file don't have to add that. The request will run through
     * all the `api` specific middlewares in the middlewares list.
     */
    protected registerApiRoutes() {
        const apiRoutes = Route.group()
            .prefix('/api')
            .middleware('api')
            .routes(...ApiRoutes);

        this.router.registerRoutes(apiRoutes);
    }
}
