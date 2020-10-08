import { IApp } from '@rheas/contracts/core/app';
import { CoreServiceProvider as BaseCoreService } from '@rheas/core/coreServiceProvider';

export class CoreServicePrivider extends BaseCoreService {
    /**
     * Register the app level settings in here. This service acts as a common
     * place to register app level settings, other service settings etc.
     */
    public boot(): void {
        super.boot();

        const app = this.container as IApp;

        /**
         * Register input fields that should not be trimmed. Fields like `password`
         * and `password_confirmation` should not be trimmed. Update the array field
         * to add new exceptions.
         */
        app.setExceptions('string.trim', ['password', 'password_confirmation']);

        /**
         * We will not encrypt XSRF-TOKEN cookies. XSRF-TOKEN is only used to check for
         * CSRF issues. Encrypted or non-encrypted, the end user won't be doing any check
         * on it and will be simply passing the same value to the server. So, if we encrypt
         * it, we will have to decrypt it and check. To eliminate the double work that serves
         * no purpose, we are avoiding it.
         *
         * If you find any reason to encrypt it, please let me know.
         */
        app.setExceptions('cookies.encrypt', ['XSRF-TOKEN']);

        /**
         * Add url's that should be excempted from CSRF verification check. Generally,
         * POST request endpoints that are used as a webhook or callback url on a third
         * party website/app should be added in here.
         *
         * For example, add `/payment/*` to the list to exclude all the routes starting
         * with path `/payment` to be excluded from CSRF check.
         */
        // app.setExceptions('csrf', []);
    }
}
