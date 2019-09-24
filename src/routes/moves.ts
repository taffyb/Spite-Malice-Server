import express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/moves', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getGames.cyp', {});
        res.send( results[0].games);
    } );
    app.post( prefix + '/moves', async ( req: any, res ) => {
        const params: any = req.body;
        try {
            let turns = await neo4jSvc.executeCypher('lastTurn.cyp', {guuid: params.guuid});
            console.log(`POST /moves lastTurnId:${turns[0].lastTurnId}`);
            if (turns[0].lastTurnId === 0) {

                turns = await neo4jSvc.executeCypher('addFirstTurn.cyp',
                        {guuid: params.guuid,
                        puuid: params.moves[0].puuid});
                console.log(`POST /moves addFirstTurn lastTurnId:${turns[0].lastTurnId}`);
            } else {
                turns = await neo4jSvc.executeCypher('addNextTurn.cyp',
                        {guuid: params.guuid,
                        puuid: params.moves[0].puuid,
                        lastTurnId: turns[0].lastTurnId});
                console.log(`POST /moves addNextTurn lastTurnId:${turns[0].lastTurnId}`);
            }

            params.lastTurnId = turns[0].lastTurnId;

            let results;
            if (params.moves.length > 1) {
                results = await neo4jSvc.executeCypher('addMoves.cyp', params);
            } else {
                results = await neo4jSvc.executeCypher('addMove.cyp', params);
            }

            console.log(`POST /moves \nparams:${JSON.stringify(params)}\nadded ${results[0].moveCount} moves`);
            if (results.length > 0) {
                res.send( {count: results[0].moveCount} );
            } else {
                res.sendStatus(500);
            }
        } catch (err) {
            res.sendStatus(500);
        }
    } );
};
