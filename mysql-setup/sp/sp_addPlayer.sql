DROP PROCEDURE IF EXISTS sp_addPlayer;
DELIMITER $$
CREATE PROCEDURE `sp_addPlayer`(IN pUUID varchar(36),IN pName varchar(36))
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
    DECLARE vMESSAGE VARCHAR(1000);
    
	SET vMESSAGE = concat('CALL sp_addPlayer(',pUUID,',',pName,')');
	CALL sp_log_msg(vMESSAGE);
	INSERT INTO tbl_player(UUID, name) VALUES (pUUID, pName);
END$$
DELIMITER ;
