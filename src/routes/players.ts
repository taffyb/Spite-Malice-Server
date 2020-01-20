import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';
import {DatabaseSvc} from '../classes/DatabaseSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const dbSvc = DatabaseSvc.getInstance();

    app.get( prefix + '/player/:uuid', async ( req: any, res ) => {
        const uuid = req.params.uuid;
        const player = await dbSvc.getPlayer(uuid);

        res.send( player );
    });
    app.get( prefix + '/player', async ( req: any, res ) => {
        const results = await dbSvc.test();

        res.send( results );
    });
};
