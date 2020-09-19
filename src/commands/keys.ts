import { Color } from '../colors';
import { ICommand } from '@rheas/contracts/cli';
import { IApp } from '@rheas/contracts/core/app';
import { IEncrypter } from '@rheas/contracts/security';

export class GenerateKeys implements ICommand {
    /**
     * Application encrypted key generator.
     *
     * @var IEncrypter
     */
    protected _encrypter: IEncrypter;

    /**
     * Creates a new encrypted key generator
     *
     * @param app
     */
    constructor(app: IApp) {
        this._encrypter = app.get('encrypter');
    }

    /**
     * Creates two application keys and prints them on the log.
     */
    public async handle(): Promise<void> {
        const keys = await Promise.all([
            this._encrypter.generateKey(),
            this._encrypter.generateKey(),
        ]);

        console.log(Color.pattern('green'), `APP_KEY: ${keys[0]}`);
        console.log(Color.pattern('green'), `HASH_KEY: ${keys[1]}`);

        console.log("Copy-paste these values to the corresponding .env variables.")
    }
}
