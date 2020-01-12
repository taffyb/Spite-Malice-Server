DROP PROCEDURE IF EXISTS sp_setGameState;
DELIMITER $$
CREATE PROCEDURE `sp_setGameState`(IN pGameUUID varchar(36), IN pState varchar(6))
BEGIN
/*
  CREATED: 11/01/2020, Taffy Brecknock
  
  PARAMS IN:
  
  PRE_CONDITION:
  
  POST_CONDITION:
  
  CHANGE HISTORY:
*/
	DECLARE vStateExists BOOLEAN;
    DECLARE vMESSAGE VARCHAR(1000);
    
	SET vMESSAGE = concat('CALL sp_setGameState(',pGameUUID,',',pState,')');
	CALL sp_log_msg(vMESSAGE);
    
    SET vStateExists = (SELECT count(*) FROM tbl_game_state WHERE GAME_UUID=pGameUUID)>0 ;
    IF(vStateExists) THEN
		UPDATE tbl_game_state
			SET STATE=pState
		WHERE GAME_UUID=pGameUUID;
    ELSE		
		INSERT INTO tbl_game_state(GAME_UUID,STATE)
        VALUES (pGameUUID,pState);
    END IF;
END$$
DELIMITER ;
