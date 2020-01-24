import {IDatabaseImpl} from './IDatabaseImpl';
import {IPlayerActions} from './IPlayerActions';
import {IGameActions} from './IGameActions';
import {IGameModel} from './IGameModel';
import {IPlayerModel} from './IPlayerModel';
import {IMoveModel} from './IMoveModel';

export class Neo4JImpl implements IDatabaseImpl {
    performMoves(gameUUID: string, playerUUID: string, moves: IMoveModel[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addPlayer(UUID: string, name: string): Promise<IPlayerModel> {
        throw new Error('Method not implemented.');
    }
    deletePlayer(UUID: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    updatePlayer(UUID: string, name: string): Promise<IPlayerModel> {
        throw new Error('Method not implemented.');
    }
    addGame(game: IGameModel): Promise<IGameModel> {
        throw new Error('Method not implemented.');
    }
    deleteGame(UUID: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    updateGame(UUID: string, name: string): Promise<IGameModel> {
        throw new Error('Method not implemented.');
    }
    getGame(UUID: string): Promise<IGameModel> {
        throw new Error('Method not implemented.');
    }
    getGames(deleted: boolean): Promise<IGameModel[]> {
        throw new Error('Method not implemented.');
    }
    setCards(gameUUID: string, cards: number[], pos: number, playerUUID: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    updateCard(gameUUID: string, move: IMoveModel): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getPlayer(UUID: string): Promise<IPlayerModel> {
        throw new Error('Method not implemented.');
    }
    getPlayers(): Promise<IPlayerModel[]> {
        throw new Error('Method not implemented.');
    }
    performMooves(gameUUID: string, playerUUID: string, moves: IMoveModel[]): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    test(): Promise<any[]> {
        throw new Error('Method not implemented.');
    }

}
