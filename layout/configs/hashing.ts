import { env } from '@rheas/support/helpers';
import { IHashConfig } from '@rheas/contracts/configs';

const hashConfig: IHashConfig = {
    /**
     * Application hashing key.
     *
     * @property
     */
    key: env('HASH_KEY'),

    /**
     * Default hashing algo name.
     *
     * @property
     */
    driver: 'bcrypt',

    /**
     * Properties specific to bcrypt hashing algo.
     *
     * @property
     */
    bcrypt: {
        rounds: 10,
    },

    /**
     * Properties specific to argon hashing algo. We don't support 
     * this yet.
     *
     * @property
     
    argon: {
        memory: 1024,
        threads: 2,
        time: 2,
    },
    */
};

export default hashConfig;
