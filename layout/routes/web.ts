import { RouteRegistrar } from "@laress/routing";
import { IRoute } from "@laress/contracts/routes";

export class WebRoutes extends RouteRegistrar {

    /**
     * Register all the web specific middlewares in here.
     * 
     * @var array
     */
    protected _middlewares = [];

    /**
     * Register all the web routes inside the array.
     * 
     * @return array
     */
    public routesList(): IRoute[] {
        return [

        ];
    }
}