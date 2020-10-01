import { ClassOf } from '@rheas/contracts';
import { IException } from '@rheas/contracts/errors';
import { ExceptionHandler as BaseExceptionHandler } from '@rheas/errors';

export class ExceptionHandler extends BaseExceptionHandler {
    /**
     * These field won't be sent back when showing errors.
     *
     * @var array
     */
    protected _ignoreFields: string[] = ['password', 'password_confirmation'];

    /**
     * The list of exception classes that are not to be logged.
     *
     * @var array
     */
    protected dontReport: ClassOf<IException>[] = [];
}
