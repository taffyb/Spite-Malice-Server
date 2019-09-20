"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Enums_1 = require("./Enums");
const Enums_2 = require("./Enums");
const Enums_3 = require("./Enums");
class Player {
    constructor() {
        this.type = Enums_2.PlayerTypesEnum.BASE;
        this.isPrimary = false;
        this.guid = uuid_1.v4();
    }
    /* Intrinsically NOT type safe */
    static fromJSON(JSONString) {
        const newPlayer = new this();
        const p = JSON.parse(JSONString);
        newPlayer.guid = p.guid;
        newPlayer.type = p.type;
        newPlayer.name = p.name;
        newPlayer.cards = p.cards;
        newPlayer.isPrimary = p.isPrimary;
        return newPlayer;
    }
    initialiseCards() {
        this.cards = [[Enums_3.CardsEnum.NO_CARD],
            Enums_3.CardsEnum.NO_CARD,
            Enums_3.CardsEnum.NO_CARD,
            Enums_3.CardsEnum.NO_CARD,
            Enums_3.CardsEnum.NO_CARD,
            Enums_3.CardsEnum.NO_CARD,
            [Enums_3.CardsEnum.NO_CARD],
            [Enums_3.CardsEnum.NO_CARD],
            [Enums_3.CardsEnum.NO_CARD],
            [Enums_3.CardsEnum.NO_CARD]]; /* STACK_4*/
    }
    getType() {
        return this.type;
    }
    pileSize() {
        return this.cards[Enums_1.PlayerPositionsEnum.PILE].length;
    }
    maxStack() {
        let max = 1;
        for (let s = Enums_1.PlayerPositionsEnum.STACK_1; s <= Enums_1.PlayerPositionsEnum.STACK_4; s++) {
            max = (max < this.cards[s].length ? this.cards[s].length : max);
        }
        const maxArray = [];
        for (let i = 0; i < max - 2; i++) {
            maxArray.push(Enums_3.CardsEnum.NO_CARD);
        }
        //      console.log(`maxStack ${JSON.stringify(maxArray)}`);
        return maxArray;
    }
    removeCard(fromPosition) {
        switch (true) {
            case (fromPosition === Enums_1.PlayerPositionsEnum.PILE):
                this.cards[Enums_1.PlayerPositionsEnum.PILE].pop();
                break;
            case (fromPosition >= Enums_1.PlayerPositionsEnum.HAND_1 && fromPosition <= Enums_1.PlayerPositionsEnum.HAND_5):
                this.cards[fromPosition] = Enums_3.CardsEnum.NO_CARD;
                break;
            case (fromPosition >= Enums_1.PlayerPositionsEnum.STACK_1 && fromPosition <= Enums_1.PlayerPositionsEnum.STACK_4):
                this.cards[fromPosition].pop();
                break;
        }
    }
    addCard(card, position) {
        switch (position) {
            case Enums_1.PlayerPositionsEnum.PILE:
                if (this.cards[Enums_1.PlayerPositionsEnum.PILE].length > 13) {
                    throw new Error('Player Pile cannot have more than 13 cards');
                }
                this.cards[Enums_1.PlayerPositionsEnum.PILE].push(card);
                break;
            case Enums_1.PlayerPositionsEnum.HAND_1:
                this.cards[Enums_1.PlayerPositionsEnum.HAND_1] = card;
                break;
            case Enums_1.PlayerPositionsEnum.HAND_2:
                this.cards[Enums_1.PlayerPositionsEnum.HAND_2] = card;
                break;
            case Enums_1.PlayerPositionsEnum.HAND_3:
                this.cards[Enums_1.PlayerPositionsEnum.HAND_3] = card;
                break;
            case Enums_1.PlayerPositionsEnum.HAND_4:
                this.cards[Enums_1.PlayerPositionsEnum.HAND_4] = card;
                break;
            case Enums_1.PlayerPositionsEnum.HAND_5:
                this.cards[Enums_1.PlayerPositionsEnum.HAND_5] = card;
                break;
            case Enums_1.PlayerPositionsEnum.STACK_1:
                this.cards[Enums_1.PlayerPositionsEnum.STACK_1].push(card);
                break;
            case Enums_1.PlayerPositionsEnum.STACK_2:
                this.cards[Enums_1.PlayerPositionsEnum.STACK_2].push(card);
                break;
            case Enums_1.PlayerPositionsEnum.STACK_3:
                this.cards[Enums_1.PlayerPositionsEnum.STACK_3].push(card);
                break;
            case Enums_1.PlayerPositionsEnum.STACK_4:
                //              console.log(`${this.name} STACK_4 + ${card}\n stack=${JSON.stringify(this.cards[PlayerPositionsEnum.STACK_4])}`);
                this.cards[Enums_1.PlayerPositionsEnum.STACK_4].push(card);
                //              console.log(`stack=${JSON.stringify(this.cards[PlayerPositionsEnum.STACK_4])}`);
                break;
            default:
                console.log(`ERROR addCard(${card},${position}) is NOT a valid Position`);
                throw new Error(`${position} is NOT a valid Position`);
        }
    }
    viewTopCard(position) {
        let card = -1;
        if (position >= Enums_1.PlayerPositionsEnum.STACK_1 && position <= Enums_1.PlayerPositionsEnum.STACK_4) {
            card = this.cards[position][this.cards[position].length - 1];
        }
        return card;
    }
    viewCard(position, depth = 1) {
        let card = -1;
        switch (position) {
            case Enums_1.PlayerPositionsEnum.PILE:
                // only show the top card on the pile.
                const pile = this.cards[Enums_1.PlayerPositionsEnum.PILE].length;
                card = this.cards[Enums_1.PlayerPositionsEnum.PILE][pile - 1];
                break;
            case Enums_1.PlayerPositionsEnum.HAND_1:
                // only show the top card on the pile.
                card = this.cards[Enums_1.PlayerPositionsEnum.HAND_1];
                break;
            case Enums_1.PlayerPositionsEnum.HAND_2:
                // only show the top card on the pile.
                card = this.cards[Enums_1.PlayerPositionsEnum.HAND_2];
                break;
            case Enums_1.PlayerPositionsEnum.HAND_3:
                // only show the top card on the pile.
                card = this.cards[Enums_1.PlayerPositionsEnum.HAND_3];
                break;
            case Enums_1.PlayerPositionsEnum.HAND_4:
                // only show the top card on the pile.
                card = this.cards[Enums_1.PlayerPositionsEnum.HAND_4];
                break;
            case Enums_1.PlayerPositionsEnum.HAND_5:
                // only show the top card on the pile.
                card = this.cards[Enums_1.PlayerPositionsEnum.HAND_5];
                break;
            case Enums_1.PlayerPositionsEnum.STACK_1:
                // show the cards on the stack in reverse order.
                if (this.cards[Enums_1.PlayerPositionsEnum.STACK_1].length - 1 >= depth) {
                    card = this.cards[Enums_1.PlayerPositionsEnum.STACK_1][depth];
                }
                else {
                    card = Enums_3.CardsEnum.NO_CARD;
                }
                break;
            case Enums_1.PlayerPositionsEnum.STACK_2:
                // show the cards on the stack in reverse order.
                if (this.cards[Enums_1.PlayerPositionsEnum.STACK_2].length - 1 >= depth) {
                    card = this.cards[Enums_1.PlayerPositionsEnum.STACK_2][depth];
                }
                else {
                    card = Enums_3.CardsEnum.NO_CARD;
                }
                break;
            case Enums_1.PlayerPositionsEnum.STACK_3:
                // show the cards on the stack in reverse order.
                if (this.cards[Enums_1.PlayerPositionsEnum.STACK_3].length - 1 >= depth) {
                    card = this.cards[Enums_1.PlayerPositionsEnum.STACK_3][depth];
                }
                else {
                    card = Enums_3.CardsEnum.NO_CARD;
                }
                break;
            case Enums_1.PlayerPositionsEnum.STACK_4:
                // show the cards on the stack in reverse order.
                if (this.cards[Enums_1.PlayerPositionsEnum.STACK_4].length - 1 >= depth) {
                    card = this.cards[Enums_1.PlayerPositionsEnum.STACK_4][depth];
                }
                else {
                    card = Enums_3.CardsEnum.NO_CARD;
                }
                break;
        }
        //      console.log(`Position: ${position}, depth: ${depth}, card:${card}`);
        return card;
    }
    cardsInHand() {
        let cards = 0;
        if (this.cards[Enums_1.PlayerPositionsEnum.HAND_1] > 0) {
            cards++;
        }
        if (this.cards[Enums_1.PlayerPositionsEnum.HAND_2] > 0) {
            cards++;
        }
        if (this.cards[Enums_1.PlayerPositionsEnum.HAND_3] > 0) {
            cards++;
        }
        if (this.cards[Enums_1.PlayerPositionsEnum.HAND_4] > 0) {
            cards++;
        }
        if (this.cards[Enums_1.PlayerPositionsEnum.HAND_5] > 0) {
            cards++;
        }
        return cards;
    }
}
exports.Player = Player;
