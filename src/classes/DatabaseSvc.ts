import {IGameModel, IPlayerModel, IMoveModel} from 's-n-m-lib';
import {IDatabaseImpl} from './IDatabaseImpl';
import {MySqlImpl} from './MySqlImpl';
import dotenv from 'dotenv';

export class DatabaseSvc implements IDatabaseImpl {

    private constructor() {
        dotenv.config();
    }

    static svc: DatabaseSvc;
    db: IDatabaseImpl;
    static getInstance(): DatabaseSvc {
        if (!this.svc) {
            this.svc = new DatabaseSvc();
//            this.svc.db = new MySqlImpl();
//            console.log(`this.svc.db=${JSON.stringify(this.svc.db)}`);
//            const impl = `./${process.env.DB_IMPLEMENTATION}`;
            this.svc.db = new MySqlImpl();

//            this.loadDbImpl(this.svc);

        }
        return this.svc;
    }
    static async loadDbImpl(svc: DatabaseSvc) {
        const impl = `./${process.env.DB_IMPLEMENTATION}`;
        const dbImpl = (await import(impl));
        svc.db = dbImpl;
        console.log(`impl:${JSON.stringify(dbImpl)}`);
    }
    performMoves(gameUUID: string, playerUUID: string, moves: IMoveModel[]): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    addGame(game: IGameModel): Promise<IGameModel> {
        return this.db.addGame(game);
//        throw new Error("Method not implemented.");
    }
    deleteGame(UUID: string): Promise<boolean> {
        return this.db.deleteGame(UUID);
//        throw new Error("Method not implemented.");
    }
    updateGame(UUID: string, name: string): Promise<IGameModel> {
        return this.db.updateGame(UUID, name);
//        throw new Error("Method not implemented.");
    }
    getGame(UUID: string): Promise<IGameModel> {
        return this.db.getGame(UUID);
//        throw new Error("Method not implemented.");
    }
    getGames(deleted: boolean): Promise<IGameModel[]> {
            return this.db.getGames(deleted);
//        throw new Error("Method not implemented.");
    }
    setCards(gameUUID: string, cards: number[], pos: number, playerUUID: string): Promise<boolean> {
        return this.db.setCards(gameUUID, cards, pos, playerUUID);
//        throw new Error("Method not implemented.");
    }
    updateCard(gameUUID: string, move: IMoveModel): Promise<boolean> {
        return this.db.updateCard(gameUUID, move);
//        throw new Error("Method not implemented.");
    }
    addPlayer(UUID: string, name: string): Promise<IPlayerModel> {
        return this.db.addPlayer(UUID, name);
//        throw new Error("Method not implemented.");
    }
    deletePlayer(UUID: string): Promise<boolean> {
        return this.db.deletePlayer(UUID);
//        throw new Error("Method not implemented.");
    }
    updatePlayer(UUID: string, name: string): Promise<IPlayerModel> {
        return this.db.updatePlayer(UUID, name);
//        throw new Error("Method not implemented.");
    }
    getPlayer(UUID: string): Promise<IPlayerModel> {
        return this.db.getPlayer(UUID);
//        throw new Error("Method not implemented.");
    }
    getPlayers(): Promise<IPlayerModel[]> {
        return this.db.getPlayers();
//        throw new Error("Method not implemented.");
    }

}
