import express from 'express';
import {DatabaseSvc} from '../classes/DatabaseSvc';
import {IGameModel} from '../classes/IGameModel';
import {IMoveModel} from '../classes/IMoveModel';
import { v4 as uuid } from 'uuid';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const dbSvc = DatabaseSvc.getInstance();
/*
    GET     /games          ALL games (Not including deleted)
    POST    /games          Add a New Game
    GET     /games/:uuid    Specific Game
    PUT     /games/:uuid    Update a specific Game
    DELETE  /games/:uuid    Remove a specific Game (Mark as Deleted)

    TODO GET     /games/:gameUuid/moves/ Retrieve all moves related to a specific Game
    TODO POST    /games/:gameUuid/moves/ Add new moves to a specific Game
*/
    app.get( prefix + '/games', ( req: any, res ) => {
        const games = dbSvc.getGames(false);

        games
         .then((g: IGameModel[]) => {res.send( g ); })
         .catch((err) => {res.status(500).send(err); });
    });
    app.post( prefix + '/games', ( req: any, res ) => {
        const p1Uuid: string = req.body.p1Uuid;
        const p2Uuid: string = req.body.p2Uuid;
        const newGame: IGameModel = {UUID: uuid(), name: req.body.name, player1UUID: p1Uuid, player2UUID: p2Uuid};

        const game = dbSvc.addGame(newGame);

        game
         .then((g: IGameModel) => {res.send( g ); })
         .catch((err) => {res.status(500).send(err); });
    });
    app.get( prefix + '/games/:uuid', ( req: any, res ) => {
        const game = dbSvc.getGame(req.params.uuid);

        game
         .then((g: IGameModel) => {res.send( g ); })
         .catch((err) => {res.status(500).send(err); });
    });
    app.put( prefix + '/games/:uuid', ( req: any, res ) => {
        const UUID: string = req.params.uuid;
        const name: string = req.body.name;
        const game = dbSvc.updateGame(UUID, name);

        game
         .then((g: IGameModel) => {res.send( g ); })
         .catch((err) => {res.status(500).send(err); });
    });
    app.delete( prefix + '/games/:uuid', ( req: any, res ) => {
        const gUuid = req.params.uuid;
        const deleted = dbSvc.deleteGame(gUuid);
        deleted
        .then((d: boolean) => {res.status( 200 ).send(true); })
        .catch((err) => {res.status(500).send(err); });
    });


    app.get( prefix + '/games/:uuid/moves', ( req: any, res ) => {
        const games = dbSvc.getGames(false);

        games
         .then((g: IGameModel[]) => {res.send( g ); })
         .catch((err) => {res.status(500).send(err); });
    });
    app.post( prefix + '/games/:uuid/moves', ( req: any, res ) => {
        const moves: IMoveModel[] = req.body;
        const GUuid: string = req.params.uuid;

        const m = dbSvc.add(newGame);

        m
        .then((d: boolean) => {res.status( 200 ).send(true); })
        .catch((err) => {res.status(500).send(err); });
    });
};
