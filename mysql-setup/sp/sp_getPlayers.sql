
DROP PROCEDURE IF EXISTS sp_getPlayers;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getPlayers`()
BEGIN
/*
  CREATED: 22/01/2020, Taffy Brecknock
  
  PARAMS IN:	 
  	
  PRE_CONDITION: 
  
  POST_CONDITION:
  
  CHANGE HISTORY:
*/
	
    SELECT * FROM tbl_player WHERE NOT DELETED;
END$$
DELIMITER ;