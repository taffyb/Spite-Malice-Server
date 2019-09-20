"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const Turn_1 = require("./Turn");
class Recycle extends Turn_1.Turn {
    constructor() {
        super();
        this.type = Enums_1.TurnEnum.RECYCLE;
    }
}
exports.Recycle = Recycle;
