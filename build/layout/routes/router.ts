import { ApiRoutes } from "./api";
import { WebRoutes } from "./web";
import { Router as BaseRouter } from "@laress/routing";
import { IRouteRegistrar } from "@laress/contracts/routes";

export class Router extends BaseRouter {

    /**
     * Stores all the application middlewares as KeyValue pair.
     * 
     * @var object
     */
    protected middlewares_list = {

    };

    /**
     * @return IRouteRegistrar
     */
    public getApiRoutesRegistrar(): IRouteRegistrar {
        return new ApiRoutes();
    }

    /**
     * @return IRouteRegistrar
     */
    public getWebRoutesRegistrar(): IRouteRegistrar {
        return new WebRoutes();
    }
}