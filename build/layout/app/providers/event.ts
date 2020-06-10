import { ServiceProvider } from "@rheas/core";

export class EventServiceProvider extends ServiceProvider {

    /**
     * Registers a singleton event handler on the application
     * container.
     */
    public register(): void {
        this.container.singleton(this.serviceName(), () => void 0);
    }
}