import {IGameModel,IMoveModel} from 's-n-m-lib';

export interface IGameActions {
    addGame(game: IGameModel): Promise<IGameModel>;
    deleteGame(UUID: string): Promise<boolean>;
    updateGame(UUID: string, name: string): Promise<IGameModel>;
    getGame(UUID: string): Promise<IGameModel>;
    getGames(deleted: boolean): Promise<IGameModel[]>;

    setCards(gameUUID: string, cards: number[], pos: number, playerUUID: string): Promise<boolean>;
    updateCard(gameUUID: string, move: IMoveModel): Promise<boolean>;
    performMoves(gameUUID: string, playerUUID: string, moves: IMoveModel[]): Promise<boolean>;
}
