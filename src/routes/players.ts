import * as express from 'express';
import {DatabaseSvc} from '../classes/DatabaseSvc';
import {IPlayerModel} from '../classes/IPlayerModel';
import { v4 as uuid } from 'uuid';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const dbSvc = DatabaseSvc.getInstance();

    app.get( prefix + '/players/:uuid', ( req: any, res ) => {
        const playerUuid = req.params.uuid;
        const player = dbSvc.getPlayer(playerUuid);
        player
         .then((p: IPlayerModel) => {res.send( p ); })
         .catch((err) => {res.status(500).send(err); });
    });
    app.get( prefix + '/players', ( req: any, res ) => {
        const players = dbSvc.getPlayers();

        players
         .then((p: IPlayerModel[]) => {res.send( p ); })
         .catch((err) => {res.status(500).send(err); });
    });
    app.post( prefix + '/players', ( req: any, res ) => {
        const playerUuid = uuid();
        const player = dbSvc.addPlayer(playerUuid, req.body.name);
        player
        .then((p: IPlayerModel) => {res.send( p ); })
        .catch((err) => {res.status(500).send(err); });
    });
    app.put( prefix + '/players/:uuid', ( req: any, res ) => {
        const playerUuid = req.params.uuid;
        const player = dbSvc.updatePlayer(playerUuid, req.body.name);
        player
        .then((p: IPlayerModel) => {res.send( p ); })
        .catch((err) => {res.status(500).send(err); });
    });
    app.delete( prefix + '/players/:uuid', ( req: any, res ) => {
        const playerUuid = req.params.uuid;
        const deleted = dbSvc.deletePlayer(playerUuid);
        deleted
        .then((d: boolean) => {res.status( 200 ).send(true); })
        .catch((err) => {res.status(500).send(err); });
    });
};
