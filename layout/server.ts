import app from "./app";
import { laress } from "@laress/core";

// Bind the key "app" to the App instance so that the laress framework 
// will have access to the express application. This binding is necessary 
// for running laress server.
laress.singleton('app', () => app);

// Enable oauth by uncommenting the following line. This will enable
// oauth authentication features on the app.
//
// app.enableOauth();

laress.startServer();