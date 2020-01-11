DROP TABLE IF EXISTS tbl_position;
CREATE TABLE `tbl_position` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `IS_PLAYER_POSITION` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS tbl_player;
CREATE TABLE `tbl_player` (
  `UUID` varchar(36) NOT NULL,
  `NAME` varchar(36) NOT NULL,
  `DELETED` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS tbl_game;
CREATE TABLE `tbl_game` (
  `UUID` varchar(36) NOT NULL,
  `NAME` varchar(45) DEFAULT NULL,
  `PLAYER1_UUID` varchar(36) NOT NULL,
  `PLAYER2_UUID` varchar(36) NOT NULL,
  `DELETED` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`UUID`),
  KEY `fk_GAME_PLAYER1_idx` (`PLAYER1_UUID`),
  KEY `fk_GAME_PLAYER2_idx` (`PLAYER2_UUID`),
  CONSTRAINT `fk_GAME_PLAYER1` FOREIGN KEY (`PLAYER1_UUID`) REFERENCES `tbl_player` (`UUID`),
  CONSTRAINT `fk_GAME_PLAYER2` FOREIGN KEY (`PLAYER2_UUID`) REFERENCES `tbl_player` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS tbl_turn;
CREATE TABLE `tbl_turn` (
  `UUID` varchar(36) NOT NULL,
  `GAME_UUID` varchar(36) NOT NULL,
  `TURN_NUM` int(11) NOT NULL,
  `PLAYER_UUID` varchar(36) NOT NULL,
  PRIMARY KEY (`UUID`),
  KEY `fk_TURN_GAME_idx` (`GAME_UUID`),
  KEY `fk_TURN_PLAYER_idx` (`PLAYER_UUID`),
  CONSTRAINT `fk_TURN_GAME` FOREIGN KEY (`GAME_UUID`) REFERENCES `tbl_game` (`UUID`),
  CONSTRAINT `fk_TURN_PLAYER` FOREIGN KEY (`PLAYER_UUID`) REFERENCES `tbl_player` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS tbl_move;
CREATE TABLE `tbl_move` (
  `TURN_UUID` varchar(36) NOT NULL,
  `MOVE_NUM` int(11) NOT NULL,
  `FROM_POS` int(11) NOT NULL,
  `TO_POS` int(11) NOT NULL,
  `CARD_NUM` int(11) NOT NULL,
  `IS_DISCARD` tinyint(4) DEFAULT NULL,
  KEY `fk_MOVE_TURN1_idx` (`TURN_UUID`),
  CONSTRAINT `fk_MOVE_TURN1` FOREIGN KEY (`TURN_UUID`) REFERENCES `tbl_turn` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS tbl_game_state;
CREATE TABLE `tbl_game_state` (
  `GAME_UUID` varchar(36) NOT NULL,
  `STATE` enum('ACTIVE','WINNER','DRAW') NOT NULL DEFAULT 'ACTIVE',
  UNIQUE KEY (`GAME_UUID`),
  CONSTRAINT `fk_GAME_GAME_STATE` FOREIGN KEY (`GAME_UUID`) REFERENCES `tbl_game` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS tbl_card;
CREATE TABLE `tbl_card` (
  `GAME_UUID` varchar(36) NOT NULL,
  `CARD_NO` int NOT NULL,
  `POSITION` int NOT NULL,
  `PLAYER_UUID` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`CARD_NO`),
  KEY `fk_GAME_CARDS_idx` (`GAME_UUID`),
  KEY `fk_GAME_PLAYER_idx` (`PLAYER_UUID`),
  CONSTRAINT `fk_GAME_CARDS` FOREIGN KEY (`GAME_UUID`) REFERENCES `tbl_game` (`UUID`),
  CONSTRAINT `fk_GAME_PLAYER` FOREIGN KEY (`PLAYER_UUID`) REFERENCES `tbl_player` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (0,'PLAYER_PILE',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (1,'PLAYER_HAND_1',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (2,'PLAYER_HAND_2',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (3,'PLAYER_HAND_3',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (4,'PLAYER_HAND_4',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (5,'PLAYER_HAND_5',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (6,'PLAYER_STACK_1',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (7,'PLAYER_STACK_2',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (8,'PLAYER_STACK_3',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`,IS_PLAYER_POSITION) VALUES (9,'PLAYER_STACK_4',TRUE);
INSERT INTO `tbl_position` (`ID`,`NAME`) VALUES (10,'STACK_1');
INSERT INTO `tbl_position` (`ID`,`NAME`) VALUES (11,'STACK_2');
INSERT INTO `tbl_position` (`ID`,`NAME`) VALUES (12,'STACK_3');
INSERT INTO `tbl_position` (`ID`,`NAME`) VALUES (13,'STACK_4');
INSERT INTO `tbl_position` (`ID`,`NAME`) VALUES (20,'DECK');
INSERT INTO `tbl_position` (`ID`,`NAME`) VALUES (21,'RECYCLE');
