import { Router } from "../../routes/router";
import { ServiceProvider } from "@laress/core";

export class RouteProvider extends ServiceProvider {

    /**
     * Registers the router to the application container. Creates
     * a singleton Router instance.
     */
    public register(): void {

        this.app.singleton('router', () => {
            return new Router();
        });
    }
}