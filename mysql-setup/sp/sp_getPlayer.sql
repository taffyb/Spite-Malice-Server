DROP PROCEDURE IF EXISTS sp_getPlayer;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getPlayer`(
	IN pUUID varchar(36))
BEGIN
/*
  CREATED: 22/01/2020, Taffy Brecknock
  
  PARAMS IN:
	pUUID 			- UUID used to identify the player 
  	
  PRE_CONDITION:
  	The Player already exist 
  
  POST_CONDITION:
  
  CHANGE HISTORY:
*/
	
    SELECT * FROM tbl_player WHERE UUID=pUUID;
END$$
DELIMITER ;