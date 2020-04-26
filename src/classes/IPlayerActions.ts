import {IPlayerModel} from 's-n-m-lib';

export interface IPlayerActions {
    addPlayer(UUID: string, name: string): Promise<IPlayerModel>;
    deletePlayer(UUID: string): Promise<boolean>;
    updatePlayer(UUID: string, name: string): Promise<IPlayerModel>;
    getPlayer(UUID: string): Promise<IPlayerModel>;
    getPlayers(): Promise<IPlayerModel[]>;
}
