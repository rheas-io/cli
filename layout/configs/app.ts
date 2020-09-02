import { env } from '@rheas/support/helpers';
import { IAppConfig } from '@rheas/contracts/configs';
import { DatabaseProvider } from '../app/providers/db';
import { RouteProvider } from '../app/providers/route';
import { UrlServiceProvider } from '@rheas/routing/urlServiceProvider';

const appConfigs: IAppConfig = {
    /**
     * The application name.
     */
    name: env('APP_NAME', 'Rheas Application'),

    /**
     * The application production flag. By default rheas application
     * configs are in debug mode. Change this to true in environment
     * file before deploying to production.
     */
    production: env('APP_PRODUCTION', false),

    /**
     * The port where http request has to be served. Rheas application
     * will listen to this port for http requests.
     */
    port: env('HTTP_PORT', 3000),

    /**
     * The port where secure requests are served. Application will listen to
     * this port for https requests.
     */
    secure_port: env('HTTPS_PORT', 3001),

    /**
     * Prints log on console, when debug is set to true. Set this to false on
     * production as writing to console is a heavy operation.
     */
    debug: env('APP_DEBUG', true),

    /**
     * Maintenance mode flag. When this flag is set true, the server will respond
     * back with a 503 json response/maintenance page html. No other request will pass
     * through.
     */
    maintenance: env('MAINTENANCE', false),

    /**
     * Maintenance mode allowed ips. Requests from these ip's will bypass the maintenance
     * mode restrictions.
     */
    allowed_ips: [],

    /**
     * Application encryption key used when encrypting data. This is read from the
     * env variable as it has to be kept secret.
     *
     * Key should be generated when new app is created for the given cipher.
     */
    key: env('APP_KEY'),

    /**
     * The key cipher used by the application. Rheas supported ciphers are
     * aes-128-gcm, aes-192-gcm and aes-256-gcm. Application by default uses the
     * aes-256-gcm encryption
     */
    cipher: 'aes-256-gcm',

    /**
     * Service providers that issues app level services. Services are registered to
     * containers. Rheas application has two containers
     * [1] Application container
     * [2] Request container
     *
     * Application containers lifetime begins when the process begins and exits
     * when it stops. While request containers lifetime is limited to the request
     * lifecycle.
     *
     * Thus application services are initialized once and they continue to exist
     * through the application lifetime and these are shared across different request.
     * Don't add any services that works on individual requests in here. For those,
     * use the providers on request config.
     *
     * //TODO
     * Rheas service providers should return a single service and the provider config
     * uses a key:value object for service providers. The key is the service
     * name, so no two services can exist with the same name. This facilitates easy
     * calls to services.
     *
     * For example, to get app router, call app().get('router) where app() is
     * the helper function that returns application instance.
     *
     */
    providers: {
        db: DatabaseProvider,
        router: RouteProvider,
        url: UrlServiceProvider,
    },
};

export default appConfigs;
