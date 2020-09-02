import { ServiceProvider } from '@rheas/services';

export class DatabaseProvider extends ServiceProvider {
    /**
     * Registers a singleton database connector to the application
     * container.
     */
    public register(): void {
        this.container.singleton(this.name, (app) => {});
    }
}
