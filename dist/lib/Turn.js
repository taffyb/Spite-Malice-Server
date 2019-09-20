"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Enums_1 = require("./Enums");
class Turn {
    constructor() {
        this.moves = [];
        this.type = Enums_1.TurnEnum.PLAYER;
        this.guid = uuid_1.v4();
    }
}
exports.Turn = Turn;
