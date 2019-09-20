"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const Turn_1 = require("./Turn");
class Deal extends Turn_1.Turn {
    constructor() {
        super();
        this.type = Enums_1.TurnEnum.DEALER;
    }
}
exports.Deal = Deal;
