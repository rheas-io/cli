import { IDbConfig } from '@rheas/contracts/configs';
import { env } from '@rheas/support/helpers';

const dbConfig: IDbConfig = {
    /**
     * Default application db connector.
     *
     * @property
     */
    connector: env('DB_CONNECTOR', 'mongoose'),

    /**
     * Application database host.
     *
     * @property
     */
    host: env('DB_HOST', 'localhost'),

    /**
     * Database port number to connect to.
     *
     * @property
     */
    port: env('DB_PORT', 27017),

    /**
     * Name of the collection/database in the db server.
     *
     * @property
     */
    database: env('DB_DATABASE', '<%= projectName %>'),

    /**
     * Additional options for connecting to the database server.
     *
     * @property
     */
    options: {},
};

export default dbConfig;
