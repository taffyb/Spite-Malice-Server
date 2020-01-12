DROP procedure IF EXISTS `sp_deleteGame`;

DELIMITER $$
CREATE PROCEDURE `sp_deleteGame` (pGameUUID varchar(36))
BEGIN
	UPDATE tbl_game
		SET DELETED=true
	WHERE UUID = pGameUUID;
END$$

DELIMITER ;