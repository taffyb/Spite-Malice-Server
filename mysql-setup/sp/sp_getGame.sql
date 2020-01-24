DROP PROCEDURE IF EXISTS sp_getGame;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getGame`(
	IN pUUID varchar(36))
BEGIN
/*
  CREATED: 22/01/2020, Taffy Brecknock
  
  PARAMS IN:
	pUUID 			- UUID used to identify the game 
  	
  PRE_CONDITION:
  	The Game already exist 
  
  POST_CONDITION:
  
  CHANGE HISTORY:
*/
	
    SELECT * FROM tbl_game WHERE UUID=pUUID;
END$$
DELIMITER ;