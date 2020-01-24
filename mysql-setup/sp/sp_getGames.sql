DROP PROCEDURE IF EXISTS sp_getGames;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getGames`(
	IN pDeleted boolean)
BEGIN
/*
  CREATED: 22/01/2020, Taffy Brecknock
  
  PARAMS IN:
	pDeleted 			- determine whether to return 'deleted' games 
  	
  PRE_CONDITION:
  	The Game already exist 
  
  POST_CONDITION:
  
  CHANGE HISTORY:
*/
    SELECT * FROM tbl_game WHERE DELETED=pDeleted;
END$$
DELIMITER ;