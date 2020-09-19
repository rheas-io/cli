import { Cli } from './cli';
import { IApp } from '@rheas/contracts/core/app';
import { ServiceProvider } from '@rheas/services';
import { InstanceHandler } from '@rheas/contracts/container';

export class CliServiceProvider extends ServiceProvider {
    /**
     * Returns CLI service that has to be registered on the application
     * lifecycle. CLI as a service facilitates a way to extend commands
     *
     * @returns
     */
    public serviceResolver(): InstanceHandler {
        return (app) => new Cli(app as IApp);
    }
}
