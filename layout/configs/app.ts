import { env } from "@rheas/support/helpers";
import { DatabaseProvider } from "../app/providers/db";
import { RouteProvider } from "../app/providers/route";
import { UrlServiceProvider } from "@rheas/routing/urlServiceProvider";

export default {
    /**
     * The application name.
     */
    name: env('APP_NAME', 'Rheas Application'),

    /**
     * The application production flag. By default rheas application
     * configs are in debug mode. Change this to true in environment
     * file before deploying to production.
     */
    production: env('PRODUCTION', false),

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
     * Service providers that issues app level services. These services are
     * initialized once and they continue to exist through the application
     * lifetime and these are shared by different request.
     * 
     * Don't add any services that works on individual requests in here. For those,
     * use the providers on request config.
     */
    providers: {
        'db': DatabaseProvider,
        'router': RouteProvider,
        'url': UrlServiceProvider,
    }
}