import { ServiceProvider } from "@rheas/core";

export class DatabaseProvider extends ServiceProvider {

    /**
     * Registers a singleton database connector to the application
     * container.
     */
    public register(): void {

        this.container.singleton(this.serviceName(), () => void 0);
    }
}