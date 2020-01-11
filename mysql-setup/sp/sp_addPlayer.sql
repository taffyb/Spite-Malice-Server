DROP PROCEDURE IF EXISTS sp_addPlayer;
DELIMITER $$
CREATE PROCEDURE `sp_addPlayer`(IN pName varchar(36),IN pUUID varchar(36))
BEGIN
/*
  CREATED: 11/01/2020, Taffy Brecknock
  
  PARAMS IN:
  	pName	- Player's name
	pUUID	- UUID used to identify the player
  
  PRE_CONDITION:
  	The UUID does not already exist 
  
  POST_CONDITION:
  	A new Player row has been INSERTED into the player table
  
  CHANGE HISTORY:
*/
	INSERT INTO tbl_player(UUID, name) VALUES (pUUID, pName);
END$$
DELIMITER ;
