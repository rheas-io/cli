import { RedirectServiceProvider } from "@rheas/core/redirectServiceProvider";

export default {
    /**
     * Request cycle service providers. These services are initialized
     * for each request and released when request cycle ends. It is safe, if
     * these services cache the request in memory.
     */
    providers: {
        "redirect": RedirectServiceProvider
    }
}