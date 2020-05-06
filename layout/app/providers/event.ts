import { ServiceProvider } from "@laress/core";

export class EventServiceProvider extends ServiceProvider {

    /**
     * Registers a singleton event handler on the application
     * container.
     */
    public register(): void {

        this.app.singleton('events', () => {

        });
    }

}