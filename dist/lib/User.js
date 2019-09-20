"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor() { }
    get guid() {
        return this._guid;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    set name(value) {
        this._name = value;
    }
    set type(value) {
        this._type = value;
    }
    static fromJson(json) {
        const u = JSON.parse(json);
        const user = new User();
        user._guid = u.guid;
        user.name = u.name;
        user.type = u.type;
        return user;
    }
}
exports.User = User;
