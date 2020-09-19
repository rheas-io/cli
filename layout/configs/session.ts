import { env } from '@rheas/support/helpers';
import { ISessionConfig } from '@rheas/contracts/configs';
import { SameSite } from '@rheas/contracts/cookies/sameSite';

const sessionConfig: ISessionConfig = {
    /**
     * Application session store.
     *
     * @property
     */
    store: env('SESSION_STORE', 'file'),

    /**
     * Session lifetime in minutes.
     *
     * @property
     */
    lifetime: env('SESSION_LIFETIME', 120),

    /**
     * Set false if the session should persist even after closing
     * the client browser.
     *
     * @property
     */
    expire_on_close: false,

    /**
     * The path where cookie is valid.
     *
     * @property
     */
    path: '/',

    /**
     * The domain where cookie is valid.
     *
     * @property
     */
    domain: env('APP_URL', 'localhost'),

    /**
     * Set true if the cookie has to be sent over a secure channel only.
     *
     * @property
     */
    secure: true,

    /**
     * Set true if the cookie should be accessible only in HTTP headers
     * and not in Javascript.
     *
     * @property
     */
    httpOnly: true,

    /**
     * Set true if cookies should not be urlencoded.
     *
     * @property
     */
    raw: false,

    /**
     * Property that determine whether cookies are restricted to same site (STRICT)
     * or it does allow third party sites (LAX).
     *
     * @property
     */
    sameSite: SameSite.NONE,
};

export default sessionConfig;
