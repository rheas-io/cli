import apiRoutes from './api';
import webRoutes from './web';
import { Router as BaseRouter, Route } from '@rheas/routing';

export class Router extends BaseRouter {
    /**
     * Stores all the application middlewares as KeyValue pair.
     *
     * @var object
     */
    protected middlewares_list = {};

    /**
     * Registers all the api routes.
     */
    public registerRoutes() {
        this.routes(Route.group().routes(...webRoutes), Route.group('api').routes(...apiRoutes));
    }
}
