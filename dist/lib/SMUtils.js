"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
class SMUtils {
    static toFaceNumber(card) {
        let c;
        if (card > Enums_1.CardsEnum.DECK) {
            c = Enums_1.CardsEnum.JOKER;
        }
        else if (card > Enums_1.CardsEnum.NO_CARD) {
            c = card % Enums_1.CardsEnum.KING;
            if (c === 0) {
                c = Enums_1.CardsEnum.KING;
            }
        }
        else {
            c = Enums_1.CardsEnum.NO_CARD;
        }
        return c;
    }
    constructor() { }
}
exports.SMUtils = SMUtils;
