import { Router } from "../../routes/router";
import { ServiceProvider } from "@rheas/core";
import { IRouter } from "@rheas/contracts/routes";

export class RouteProvider extends ServiceProvider {

    /**
     * Registers the router to the application container. Creates
     * a singleton Router instance.
     */
    public register(): void {
        this.container.singleton(this.serviceName(), app => {
            return new Router(app)
        });
    }

    /**
     * Caches the routes on service boot.
     * 
     * Additional registrars, if any, has to be registered in this function.
     * Calls the cacheRoutes to load all the endpoints into the router. Without
     * caching the routes, the router is literally not usefull and all the registered
     * routes will be simply hanging in the object.
     */
    public boot(): void {
        const router: IRouter = this.container.get('router');

        if (router == null) return;

        // Add additional route registrars here. By default, Rheas provides
        // api and web registrars. All th routes will be loaded when the router
        // caches the routes.

        router.cacheRoutes();
    }
}