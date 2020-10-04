import { IMiddlewareMap } from '@rheas/contracts/middlewares';
import { MiddlewaresManager as BaseMiddlewaresManager } from '@rheas/middlewares';

export class MiddlewaresManager extends BaseMiddlewaresManager {
    /**
     * List of all the middlewares used in the application
     *
     * @var Object
     */
    protected _middlewares: IMiddlewareMap = {
        global: [
            '@rheas/middlewares/global/maintenance',
            '@rheas/middlewares/global/trimStrings',
            '@rheas/middlewares/global/nullEmptyStrings',
            '@rheas/middlewares/global/addCookies',
            '@rheas/middlewares/global/encryptCookies',
        ],
        web: ['@rheas/middlewares/web/startSession', '@rheas/middlewares/web/verifyCsrf'],
        api: ['@rheas/middlewares/api/throttle'],
    };
}
