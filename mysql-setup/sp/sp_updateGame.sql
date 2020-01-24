DROP procedure IF EXISTS `sp_updateGame`;

DELIMITER $$
CREATE PROCEDURE `sp_updateGame` (pGameUUID VARCHAR(36),pName VARCHAR(36))
BEGIN
	UPDATE tbl_game
		SET NAME=pName
	WHERE UUID=pGameUUID;
    
    SELECT * FROM tbl_game WHERE UUID=pGameUUID;
END$$

DELIMITER ;