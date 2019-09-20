"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Enums_1 = require("./Enums");
const Player_1 = require("./Player");
// import {DealerService} from '../services/Dealer.Service';
// import {MovesService} from '../services/Moves.Service';
class Game {
    constructor() {
        this.players = [];
        this.centreStacks = [[Enums_1.CardsEnum.NO_CARD], [Enums_1.CardsEnum.NO_CARD], [Enums_1.CardsEnum.NO_CARD], [Enums_1.CardsEnum.NO_CARD]];
        this.activePlayer = 0;
        this.inPlay = false;
        this.recyclePile = [];
        this.gameOver = '';
        this.includeJokers = 4; // maximum 4 (per deck)
        this.guid = uuid_1.v4();
        this.name = 'New Game';
    }
    static fromJSON(json) {
        const game = new Game();
        const jsonGame = JSON.parse(json);
        game.guid = jsonGame.guid;
        game.name = jsonGame.name;
        jsonGame.players.forEach((p) => { game.players.push(Player_1.Player.fromJSON(JSON.stringify(p))); });
        game.centreStacks = jsonGame.centreStacks;
        game.activePlayer = jsonGame.activePlayer;
        game.inPlay = jsonGame.inPlay;
        game.recyclePile = jsonGame.recyclePile;
        game.includeJokers = jsonGame.includeJokers;
        return game;
    }
    nextTurn() {
        const gameClone = this.clone();
    }
    clone() {
        const clone = JSON.parse(JSON.stringify(this));
        return clone;
    }
    viewTopOfStack(stack) {
        const centreStack = this.centreStacks[stack];
        let tos = centreStack[centreStack.length - 1];
        let j = 0;
        while (tos > Enums_1.CardsEnum.DECK) {
            j++;
            // its a joker
            tos = centreStack[centreStack.length - (1 + j)] + j;
        }
        return tos;
    }
}
exports.Game = Game;
