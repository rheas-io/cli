import { KeyValue } from '@rheas/contracts';
import { IMiddleware } from '@rheas/contracts/middlewares';
import { MiddlewaresManager as BaseMiddlewaresManager } from '@rheas/middlewares';

export class MiddlewaresManager extends BaseMiddlewaresManager {
    /**
     * List of all the middlewares used in the application
     *
     * @var Object
     */
    protected _middlewares: KeyValue<IMiddleware> = {};

    /**
     * Application's global middleware list.
     *
     * @var array
     */
    protected _globalMiddlewares: string[] = [];
}
