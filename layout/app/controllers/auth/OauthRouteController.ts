import { Model } from "mongoose";
import { OauthManager } from '@rheas/core/auth';
import { Request, Response, NextFunction } from "express";
import { rheas, IApplication, IUser } from "@rheas/core";
import { WebRoute, Controller } from '@rheas/core/controllers';

export class OauthRouteController extends Controller {

    /**
     * Handler for the third party authorization callback url.
     * 
     * @param req 
     * @param res 
     */
    @WebRoute()
    public async authenticate(req: Request, res: Response, next: NextFunction) {

        let oauth: OauthManager = rheas.get('oauth');

        oauth.authenticate(req, (err, access_token, refresh_token, profile) => {
            // Forward the request to error handler if authentication
            // returned any error.
            if (err) {
                return next(err);
            }

            let app: IApplication = rheas.get('app');
            let user: Model<IUser> = app.config('user.model');

            user.find();
        });
    }

    /**
     * Handles Rheas oauth default routes' authorization requests.
     * 
     * Replace the WebRoute with ApiRoute decorator if the routes are
     * registered in the api routes file.
     * 
     * @param req 
     * @param res 
     */
    @WebRoute()
    public async authorize(req: Request, res: Response) {

        let oauth: OauthManager = rheas.get('oauth');

        return oauth.authorize(req, res);
    }
}