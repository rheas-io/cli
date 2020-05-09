export default {
    /**
     * The application name.
     */
    name: 'Laress Application',
    /**
     * The port where http request has to be served. Laress application
     * will listen to this port for http requests.
     */
    port: 3000,
    /**
     * The port where secure requests are served. Application will listen to
     * this port for https requests.
     */
    secure_port: 3001,
    /**
     * Prints log on console, when debug is set to true. Set this to false on
     * production as writing to console is a heavy operation.
     */
    debug: true,
    /**
     * Maintenance mode flag. When this flag is set true, the server will respond
     * back with a 503 json response/maintenance page html. No other request will pass
     * through.
     */
    maintenance: false,
    /**
     * Maintenance mode allowed ips. Requests from these ip's will bypass the maintenance
     * mode restrictions.
     */
    allowed_ips: []
}