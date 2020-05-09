import User from './app/models/User';
import { MongoConnector } from '@laress/core';

const config = {
    db: {
        host: 'localhost',
        port: 27017,
        database: 'db_name',
        options: {},
        connector: new MongoConnector()
    },
    app: {
        port: 3000,
        name: 'Laress Application',
        debug: true,
        maintenance: false,
    },
    user: {
        model: User
    }
}

export default config;