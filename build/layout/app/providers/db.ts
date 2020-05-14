import { ServiceProvider } from "@rheas/core";

export class DatabaseProvider extends ServiceProvider {

    /**
     * Registers a singleton database connector to the application
     * container.
     */
    public register(): void {

        this.app.singleton('db', () => void 0);
    }
}