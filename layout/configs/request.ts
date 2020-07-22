import { RedirectServiceProvider } from "@rheas/core/redirectServiceProvider";

export default {
    /**
     * Request cycle service providers. These services are initialized
     * for each request and released when request cycle ends.
     */
    providers: {
        "redirect": RedirectServiceProvider
    }
}