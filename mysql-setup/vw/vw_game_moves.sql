DROP VIEW IF EXISTS vw_game_moves;
CREATE VIEW `vw_game_moves` AS 
SELECT 	`t`.`GAME_UUID` AS `GAME_UUID`,
		`p`.`NAME` AS `NAME`,
		`t`.`TURN_NUM` AS `TURN_NUM`,
		`m`.`MOVE_NUM` AS `MOVE_NUM`,
		`m`.`FROM_POS` AS `FROM_POS`,
		`m`.`TO_POS` AS `TO_POS`,
		`m`.`CARD_NUM` AS `CARD_NUM`,
		`m`.`IS_DISCARD` AS `IS_DISCARD` 
FROM ((`tbl_player` `p` join `tbl_turn` `t`) join `tbl_move` `m`) 
WHERE ((`m`.`TURN_UUID` = `t`.`UUID`) and (`p`.`UUID` = `t`.`PLAYER_UUID`));
