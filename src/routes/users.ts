import * as express from 'express';
import {Move} from '../lib/Move';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    app.get( prefix + '/users', ( req: any, res ) => {
        res.send( {name: 'Taffy'} );
    } );
};
