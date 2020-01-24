DROP procedure IF EXISTS `sp_updatePlayer`;

DELIMITER $$
CREATE PROCEDURE `sp_updatePlayer` (pPlayerUUID VARCHAR(36),pName VARCHAR(36))
BEGIN
	UPDATE tbl_player
		SET NAME=pName
	WHERE UUID=pPlayerUUID;
	
	SELECT UUID,NAME FROM tbl_player WHERE UUID=pPlayerUUID;
END$$

DELIMITER ;