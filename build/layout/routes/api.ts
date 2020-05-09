import { RouteRegistrar } from "@laress/routing";
import { IRoute } from "@laress/contracts/routes";

export class ApiRoutes extends RouteRegistrar {

    /**
     * Register all the api specific middlewares in here.
     * 
     * @var array
     */
    protected _middlewares = [];

    /**
     * Route prefix.
     * 
     * @var string
     */
    protected _path = "api";

    /**
     * Register all the api routes inside the array.
     * 
     * @return array
     */
    public routesList(): IRoute[] {
        return [

        ];
    }
}