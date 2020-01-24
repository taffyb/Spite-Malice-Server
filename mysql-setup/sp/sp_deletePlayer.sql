DROP procedure IF EXISTS `sp_deletePlayer`;

DELIMITER $$
CREATE PROCEDURE `sp_deletePlayer` (pPlayerUUID varchar(36))
BEGIN
	UPDATE tbl_player
		SET DELETED=true
	WHERE UUID = pPlayerUUID;
	
	SELECT DELETED FROM tbl_player WHERE UUID = pPlayerUUID;
END$$

DELIMITER ;