"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AutoPlayer_1 = require("./AutoPlayer");
const DeterministicEnum_1 = require("./DeterministicEnum");
const Enums_1 = require("./Enums");
const Enums_2 = require("./Enums");
const Enums_3 = require("./Enums");
const Enums_4 = require("./Enums");
const Game_1 = require("./Game");
const Move_1 = require("./Move");
const SMUtils_1 = require("./SMUtils");
class DeterministicPlayer extends AutoPlayer_1.AutoPlayer {
    static fromPlayer(player) {
        const dp = new this();
        dp.guid = player.guid;
        dp.name = player.name;
        if (player.cards) {
            dp.cards = JSON.parse(JSON.stringify(player.cards));
        }
        else {
            dp.initialiseCards();
        }
        dp.isPrimary = false;
        return dp;
    }
    constructor() {
        super();
        this.type = Enums_2.PlayerTypesEnum.DETERMINISTIC;
    }
    findNextMove(game) {
        let m;
        let moves;
        moves = this.validMoves(game);
        if (moves.length > 0) {
            m = this.findTopMove(moves);
        }
        if (!m) {
            moves = this.discardMoves(game);
            m = this.findTopMove(moves);
        }
        console.log(`Move: {discard:${m.isDiscard}, from:${m.from},card:${SMUtils_1.SMUtils.toFaceNumber(m.card)},to:${m.to} [${JSON.stringify(m)}]`);
        return m;
    }
    findTopMove(moves) {
        let topMoves = [];
        let score;
        let topMove;
        if (moves.length > 0) {
            moves.sort((n1, n2) => (n1.score - n2.score) * -1);
            //            console.log(`All Moves: ${JSON.stringify(moves)}`);
            topMoves.push(moves[0]);
            score = moves[0].score;
            topMoves[0].score = Math.floor(Math.random() * (moves.length));
            for (let i = 1; i < moves.length; i++) {
                if (moves[i].score !== score) {
                    break;
                }
                else {
                    topMoves.push(moves[i]);
                    // All the top moves have the same score so set it to a ransom number as a tie breaker
                    topMoves[topMoves.length - 1].score = Math.floor(Math.random() * (moves.length));
                }
            }
            //            console.log(`Before sort Top Moves: ${JSON.stringify(topMoves)}`);
            topMoves = topMoves.sort((n1, n2) => (n1.score - n2.score) * -1);
            //            console.log(`Sorted Top Moves: ${JSON.stringify(topMoves)}`);
            topMove = topMoves[0];
        }
        return topMove; // pick the first top move.
    }
    lookAhead(game, move) {
        let modifier = 0;
        game = Game_1.Game.fromJSON(JSON.stringify(game));
        if (!move.isDiscard) {
            if (move.to >= Enums_3.GamePositionsEnum.BASE + Enums_3.GamePositionsEnum.STACK_1 &&
                move.to <= Enums_3.GamePositionsEnum.BASE + Enums_3.GamePositionsEnum.STACK_1) {
                console.log(`game.activePlayer ${game.activePlayer} game.players[${game.players.length}]`);
                game.players[game.activePlayer].removeCard(move.from);
                game.centreStacks[move.to - Enums_3.GamePositionsEnum.BASE].push(move.card);
                const me = game.players[game.activePlayer];
                //              Can I now get a card off my pile
                if (me.viewCard(Enums_1.PlayerPositionsEnum.PILE) === move.card + 1) {
                    modifier += DeterministicEnum_1.MoveScoresEnum.FROM_PILE + 1;
                }
                //              Can my oposition now get a card off their pile
                const opId = (game.activePlayer + 1) % (game.players.length);
                const op = game.players[opId];
                if (op.viewCard(Enums_1.PlayerPositionsEnum.PILE) === move.card + 1) {
                    modifier -= DeterministicEnum_1.MoveScoresEnum.FROM_PILE;
                }
                //                Can I now move another card
                const moves = this.validMoves(game);
                if (moves.length > 0) {
                    modifier += this.findTopMove(moves).score;
                }
            }
        }
        return modifier;
    }
    discardMoves(game) {
        //        let score: number;
        const allMoves = [];
        let moves = [];
        let m;
        // there is no move identified yet
        // Discard
        // check if for cards that continue a sequence on the stack
        for (let j = Enums_1.PlayerPositionsEnum.HAND_1; j <= Enums_1.PlayerPositionsEnum.HAND_5; j++) {
            for (let i = Enums_1.PlayerPositionsEnum.STACK_1; i <= Enums_1.PlayerPositionsEnum.STACK_4; i++) {
                if ((this.viewCard(j) !== Enums_4.CardsEnum.NO_CARD) &&
                    (SMUtils_1.SMUtils.toFaceNumber(this.viewCard(j)) === SMUtils_1.SMUtils.toFaceNumber(this.viewTopCard(i)) - 1)) {
                    m = new Move_1.Move();
                    m.from = j;
                    m.card = this.viewCard(j);
                    m.to = i;
                    m.score = DeterministicEnum_1.MoveScoresEnum.DISCARD_IN_SEQUENCE;
                    m.isDiscard = true;
                    moves.push(m);
                }
            }
        }
        //        if(moves.length>0){console.log(`Discard from Hand in sequence: \n${JSON.stringify(moves)}`);}
        allMoves.push(...moves);
        moves = [];
        if (moves.length === 0) {
            for (let j = Enums_1.PlayerPositionsEnum.HAND_1; j <= Enums_1.PlayerPositionsEnum.HAND_5; j++) {
                if (this.viewCard(j) !== Enums_4.CardsEnum.NO_CARD) {
                    for (let i = Enums_1.PlayerPositionsEnum.STACK_1; i <= Enums_1.PlayerPositionsEnum.STACK_4; i++) {
                        m = new Move_1.Move();
                        m.from = j;
                        m.card = this.viewCard(j);
                        m.to = i;
                        m.score = DeterministicEnum_1.MoveScoresEnum.DISCARD_OUT_OF_SEQUENCE;
                        m.isDiscard = true;
                        moves.push(m);
                    }
                }
            }
        }
        //        if(moves.length>0){console.log(`Discard from Hand out of sequence: \n${JSON.stringify(moves)}`);}
        allMoves.push(...moves);
        return allMoves;
    }
    validMoves(game) {
        //        let score: number;
        const allMoves = [];
        let moves = [];
        let m;
        for (let pos = 0; pos <= Enums_1.PlayerPositionsEnum.STACK_4; pos++) {
            if (SMUtils_1.SMUtils.toFaceNumber(this.viewCard(pos)) === Enums_4.CardsEnum.NO_CARD) {
                continue;
            }
            switch (pos) {
                case Enums_1.PlayerPositionsEnum.PILE:
                    moves = [];
                    //                    Posible moves from Pile
                    for (let s = 0; s <= Enums_3.GamePositionsEnum.STACK_4; s++) {
                        if (SMUtils_1.SMUtils.toFaceNumber(this.viewCard(pos)) === Enums_4.CardsEnum.JOKER ||
                            SMUtils_1.SMUtils.toFaceNumber(this.viewCard(pos)) === SMUtils_1.SMUtils.toFaceNumber(game.viewTopOfStack(s)) + 1) {
                            m = new Move_1.Move();
                            m.from = pos;
                            m.card = this.viewCard(pos);
                            m.to = Enums_3.GamePositionsEnum.BASE + s;
                            m.score = DeterministicEnum_1.MoveScoresEnum.FROM_PILE;
                            moves.push(m);
                        }
                    }
                    //                    if(moves.length>0){console.log(`Posible moves from Pile: \n${JSON.stringify(moves)}`);}
                    allMoves.push(...moves);
                    break;
                case Enums_1.PlayerPositionsEnum.HAND_1:
                case Enums_1.PlayerPositionsEnum.HAND_2:
                case Enums_1.PlayerPositionsEnum.HAND_3:
                case Enums_1.PlayerPositionsEnum.HAND_4:
                case Enums_1.PlayerPositionsEnum.HAND_5:
                    moves = [];
                    //                    Posible moves from Hand to Centre Stack
                    for (let s = 0; s <= Enums_3.GamePositionsEnum.STACK_4; s++) {
                        if (SMUtils_1.SMUtils.toFaceNumber(this.viewCard(pos)) === Enums_4.CardsEnum.JOKER ||
                            SMUtils_1.SMUtils.toFaceNumber(this.viewCard(pos)) === SMUtils_1.SMUtils.toFaceNumber(game.viewTopOfStack(s)) + 1) {
                            m = new Move_1.Move();
                            m.from = pos;
                            m.card = this.viewCard(pos);
                            m.to = Enums_3.GamePositionsEnum.BASE + s;
                            m.score = (DeterministicEnum_1.MoveScoresEnum.PLAY_FROM_HAND + DeterministicEnum_1.MoveScoresEnum.ADD_TO_STACK);
                            moves.push(m);
                        }
                    }
                    //                    if(moves.length>0){console.log(`Posible moves from Hand to Centre Stack: \n: ${JSON.stringify(moves)}`);}
                    allMoves.push(...moves);
                    moves = [];
                    //                    Posible moves from Hand to Player Stack (an open space)
                    for (let s = Enums_1.PlayerPositionsEnum.STACK_1; s <= Enums_1.PlayerPositionsEnum.STACK_4; s++) {
                        if (SMUtils_1.SMUtils.toFaceNumber(this.viewCard(s)) === Enums_4.CardsEnum.NO_CARD) {
                            m = new Move_1.Move();
                            m.from = pos;
                            m.card = this.viewCard(pos);
                            m.to = s;
                            m.score = (DeterministicEnum_1.MoveScoresEnum.PLAY_FROM_HAND + DeterministicEnum_1.MoveScoresEnum.OPEN_A_SPACE + this.viewCard(pos));
                            moves.push(m);
                        }
                    }
                    //                    if(moves.length>0){console.log(`Posible moves from Hand to Player Stack (an open space): \n:`+
                    //                    ` ${JSON.stringify(moves)}`);}
                    allMoves.push(...moves);
                    break;
                case Enums_1.PlayerPositionsEnum.STACK_1:
                case Enums_1.PlayerPositionsEnum.STACK_2:
                case Enums_1.PlayerPositionsEnum.STACK_3:
                case Enums_1.PlayerPositionsEnum.STACK_4:
                    moves = [];
                    //                    Posible moves from Player Stack to Centre Stack
                    for (let s = 0; s <= Enums_3.GamePositionsEnum.STACK_4; s++) {
                        if (SMUtils_1.SMUtils.toFaceNumber(this.viewTopCard(pos)) === Enums_4.CardsEnum.JOKER ||
                            SMUtils_1.SMUtils.toFaceNumber(this.viewTopCard(pos)) === SMUtils_1.SMUtils.toFaceNumber(game.viewTopOfStack(s)) + 1) {
                            m = new Move_1.Move();
                            m.from = pos;
                            m.card = this.viewTopCard(pos);
                            m.to = Enums_3.GamePositionsEnum.BASE + s;
                            m.score = (DeterministicEnum_1.MoveScoresEnum.PLAY_FROM_STACK + DeterministicEnum_1.MoveScoresEnum.ADD_TO_STACK) + this.lookAhead(game, m);
                            moves.push(m);
                        }
                    }
                    //                    if(moves.length>0){console.log(`Posible moves from Player Statck to Centre Stack: \n: ${JSON.stringify(moves)}`);}
                    allMoves.push(...moves);
                    break;
            }
        }
        return allMoves;
    }
}
exports.DeterministicPlayer = DeterministicPlayer;
