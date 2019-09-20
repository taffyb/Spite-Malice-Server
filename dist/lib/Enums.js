"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerTypesEnum;
(function (PlayerTypesEnum) {
    PlayerTypesEnum[PlayerTypesEnum["BASE"] = 0] = "BASE";
    PlayerTypesEnum[PlayerTypesEnum["DETERMINISTIC"] = 1] = "DETERMINISTIC";
})(PlayerTypesEnum = exports.PlayerTypesEnum || (exports.PlayerTypesEnum = {}));
var PlayerPositionsEnum;
(function (PlayerPositionsEnum) {
    PlayerPositionsEnum[PlayerPositionsEnum["NO_POS"] = -1] = "NO_POS";
    PlayerPositionsEnum[PlayerPositionsEnum["PILE"] = 0] = "PILE";
    PlayerPositionsEnum[PlayerPositionsEnum["HAND_1"] = 1] = "HAND_1";
    PlayerPositionsEnum[PlayerPositionsEnum["HAND_2"] = 2] = "HAND_2";
    PlayerPositionsEnum[PlayerPositionsEnum["HAND_3"] = 3] = "HAND_3";
    PlayerPositionsEnum[PlayerPositionsEnum["HAND_4"] = 4] = "HAND_4";
    PlayerPositionsEnum[PlayerPositionsEnum["HAND_5"] = 5] = "HAND_5";
    PlayerPositionsEnum[PlayerPositionsEnum["STACK_1"] = 6] = "STACK_1";
    PlayerPositionsEnum[PlayerPositionsEnum["STACK_2"] = 7] = "STACK_2";
    PlayerPositionsEnum[PlayerPositionsEnum["STACK_3"] = 8] = "STACK_3";
    PlayerPositionsEnum[PlayerPositionsEnum["STACK_4"] = 9] = "STACK_4";
})(PlayerPositionsEnum = exports.PlayerPositionsEnum || (exports.PlayerPositionsEnum = {}));
var GamePositionsEnum;
(function (GamePositionsEnum) {
    GamePositionsEnum[GamePositionsEnum["BASE"] = 10] = "BASE";
    GamePositionsEnum[GamePositionsEnum["STACK_1"] = 0] = "STACK_1";
    GamePositionsEnum[GamePositionsEnum["STACK_2"] = 1] = "STACK_2";
    GamePositionsEnum[GamePositionsEnum["STACK_3"] = 2] = "STACK_3";
    GamePositionsEnum[GamePositionsEnum["STACK_4"] = 3] = "STACK_4";
    GamePositionsEnum[GamePositionsEnum["DECK"] = 20] = "DECK";
    GamePositionsEnum[GamePositionsEnum["RECYCLE_PILE"] = 21] = "RECYCLE_PILE";
})(GamePositionsEnum = exports.GamePositionsEnum || (exports.GamePositionsEnum = {}));
var TabsEnum;
(function (TabsEnum) {
    TabsEnum[TabsEnum["DEFAULT"] = 0] = "DEFAULT";
    TabsEnum[TabsEnum["DASHBOARD"] = 0] = "DASHBOARD";
    TabsEnum[TabsEnum["PLAY_AREA"] = 1] = "PLAY_AREA";
})(TabsEnum = exports.TabsEnum || (exports.TabsEnum = {}));
var SuitsEnum;
(function (SuitsEnum) {
    SuitsEnum[SuitsEnum["SPADES"] = 0] = "SPADES";
    SuitsEnum[SuitsEnum["HEARTS"] = 13] = "HEARTS";
    SuitsEnum[SuitsEnum["CLUBS"] = 26] = "CLUBS";
    SuitsEnum[SuitsEnum["DIAMONDS"] = 39] = "DIAMONDS";
})(SuitsEnum = exports.SuitsEnum || (exports.SuitsEnum = {}));
var CardsEnum;
(function (CardsEnum) {
    CardsEnum[CardsEnum["NO_CARD"] = 0] = "NO_CARD";
    CardsEnum[CardsEnum["ACE"] = 1] = "ACE";
    CardsEnum[CardsEnum["TWO"] = 2] = "TWO";
    CardsEnum[CardsEnum["THREE"] = 3] = "THREE";
    CardsEnum[CardsEnum["FOUR"] = 4] = "FOUR";
    CardsEnum[CardsEnum["FIVE"] = 5] = "FIVE";
    CardsEnum[CardsEnum["SIX"] = 6] = "SIX";
    CardsEnum[CardsEnum["SEVEN"] = 7] = "SEVEN";
    CardsEnum[CardsEnum["EIGHT"] = 8] = "EIGHT";
    CardsEnum[CardsEnum["NINE"] = 9] = "NINE";
    CardsEnum[CardsEnum["TEN"] = 10] = "TEN";
    CardsEnum[CardsEnum["JACK"] = 11] = "JACK";
    CardsEnum[CardsEnum["QUEEN"] = 12] = "QUEEN";
    CardsEnum[CardsEnum["KING"] = 13] = "KING";
    CardsEnum[CardsEnum["DECK"] = 52] = "DECK";
    CardsEnum[CardsEnum["JOKER"] = 53] = "JOKER";
})(CardsEnum = exports.CardsEnum || (exports.CardsEnum = {}));
var TurnEnum;
(function (TurnEnum) {
    TurnEnum[TurnEnum["PLAYER"] = 0] = "PLAYER";
    TurnEnum[TurnEnum["DEALER"] = 1] = "DEALER";
    TurnEnum[TurnEnum["RECYCLE"] = 2] = "RECYCLE";
})(TurnEnum = exports.TurnEnum || (exports.TurnEnum = {}));
