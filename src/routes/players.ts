import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/players/:uuid', async ( req: any, res ) => {
        const uuid = req.params.uuid;
        const results = await neo4jSvc.executeCypher('getPlayer.cyp', {uuid: uuid});

        res.send( results[0] );
    });
    app.get( prefix + '/players', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getPlayers.cyp', {});

        res.send( results[0] );
    });
};
