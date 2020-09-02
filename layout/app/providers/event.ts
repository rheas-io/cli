import { ServiceProvider } from '@rheas/services';

export class EventServiceProvider extends ServiceProvider {
    /**
     * Registers a singleton event handler on the application
     * container.
     */
    public register(): void {
        this.container.singleton(this.name, (app) => {});
    }
}
