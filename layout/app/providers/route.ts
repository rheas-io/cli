import { Router } from '../../routes/router';
import { IApp } from '@rheas/contracts/core';
import { ServiceProvider } from '@rheas/services';

export class RouteProvider extends ServiceProvider {
    /**
     * Registers the router to the application container. Creates
     * a singleton Router instance.
     */
    public register(): void {
        this.container.singleton(this.name, (app) => {
            const router = new Router(app as IApp);

            router.registerRoutes();
            router.cacheRoutes();

            return router;
        });
    }
}
