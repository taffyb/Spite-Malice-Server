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
    SET vStateExists = (SELECT count(*) FROM tbl_game_state WHERE game_uuid=pGameUUID)>0 ;
    IF(vStateExists) THEN
		UPDATE tbl_game_state
			SET state=pState
		WHERE game_uuid=pGameUUID;
    ELSE		
		INSERT INTO tbl_game_state(game_uuid,state)
        VALUES (pGameUUID,pState);
    END IF;
END$$
DELIMITER ;
