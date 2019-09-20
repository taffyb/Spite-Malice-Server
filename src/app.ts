import express from 'express';
import logger from 'morgan';
import * as userRoutes from './routes/users';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = process.env.SVR_PORT; // default port to listen

app.use(logger('dev'));
// define a route handler for the default home page
app.get( '/', ( req: any, res: any ) => {
    res.send( 'Hello world!.' );
} );

// REGISTER OUR ROUTES -------------------------------
userRoutes.register(app);

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
