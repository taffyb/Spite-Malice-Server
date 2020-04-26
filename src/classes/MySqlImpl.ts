import {IDatabaseImpl} from './IDatabaseImpl';
import {IPlayerActions} from './IPlayerActions';
import {IGameActions} from './IGameActions';
import {IGameModel, IPlayerModel, IMoveModel} from 's-n-m-lib';
import {MySqlSvc} from './MySqlSvc';

export class MySqlImpl implements IDatabaseImpl {
    mysql: MySqlSvc;
    constructor() {
        this.mysql = MySqlSvc.getInstance();
    }

    getPlayer(UUID: string): Promise<IPlayerModel> {
        return this.mysql.executeStoredProc<IPlayerModel>('getPlayer(?)', [UUID]);
    }
    getPlayers(): Promise<IPlayerModel[]> {
        return this.mysql.executeStoredProcArr<IPlayerModel>('getPlayers');
    }

    addPlayer(UUID: string, name: string): Promise<IPlayerModel> {
        return this.mysql.executeStoredProc<IPlayerModel>(
                'addPlayer(?,?)', [UUID, name]);
    }
    deletePlayer(UUID: string): Promise<boolean> {
        return this.mysql.executeStoredProc<boolean>('deletePlayer(?)', [UUID]);
    }
    updatePlayer(UUID: string, name: string): Promise<IPlayerModel> {
        return this.mysql.executeStoredProc<IPlayerModel>(
                'updatePlayer(?,?)', [UUID, name]);
    }
    addGame(game: IGameModel): Promise<IGameModel> {

        return this.mysql.executeStoredProc<IGameModel>(
                'addGame(?,?,?,?)',
                [game.uuid, game.name, game.player1Uuid, game.player2Uuid]
                );
    }
    deleteGame(UUID: string): Promise<boolean> {
        return this.mysql.executeStoredProc<boolean>('deleteGame(?)', [UUID]);
    }
    updateGame(UUID: string, name: string): Promise<IGameModel> {
        return this.mysql.executeStoredProc<IGameModel>(
                'updateGame(?,?)', [UUID, name]);
    }
    getGame(UUID: string): Promise<IGameModel> {
        return this.mysql.executeStoredProc<IGameModel>('getGame(?)', [UUID]);
    }
    getGames(deleted: boolean): Promise<IGameModel[]> {
        return this.mysql.executeStoredProcArr<IGameModel>('getGames(?)', [deleted]);
    }
    setCards(gameUUID: string, cards: number[], pos: number, playerUUID: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    updateCard(gameUUID: string, move: IMoveModel): Promise < boolean > {
        throw new Error('Method not implemented.');
    }
    performMoves(gameUUID: string, playerUUID: string, moves: IMoveModel[]): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
