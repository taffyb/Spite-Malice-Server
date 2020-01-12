DROP PROCEDURE IF EXISTS sp_addMove;
DELIMITER $$
CREATE PROCEDURE `sp_addMove`(pGameUUID varchar(36), pMoveJSON varchar(256))
BEGIN
/*
  CREATED: 11/01/2020, Taffy Brecknock
  
  PARAMS IN:
  	pGameUUID	- Game that this move applies to
	pMoveJSON	- JSON String representing the move
				  {'turnUUID':string,'playerUUID':string,'fromPos':integer,'toPos':integer,'card':integer,'isDiscard':boolean}
  
  PRE_CONDITION:
  	The GameUUID exists,pMoveJSON is a valid JSON string
  
  POST_CONDITION:
  	If the turn already exists this move will be added to it
  	If the turn does not already exist a new Turn will be INSERTED
  
  CHANGE HISTORY:
  	11/01/2020 - update the card position after saving a move
*/
	DECLARE vIsDiscard BOOLEAN;
	DECLARE vFromPos INT;
	DECLARE vToPos INT;
	DECLARE vCard INT;
    DECLARE vTurnUUID VARCHAR(36);
    DECLARE vPlayerUUID VARCHAR(36);
    DECLARE vGameExists INT;
    DECLARE vPlayerExists INT;
    DECLARE vTurnExists INT;
    DECLARE vMESSAGE VARCHAR(1000);
    
	SET vMESSAGE = concat('CALL sp_addMove(',pGameUUID,',',pMoveJSON,')');
	CALL sp_log_msg(vMESSAGE);
    
    SET vIsDiscard = JSON_EXTRACT(pMoveJSON,'$.isDiscard');
    SET vFromPos = JSON_EXTRACT(pMoveJSON,'$.fromPos');
    SET vToPos = JSON_EXTRACT(pMoveJSON,'$.toPos');
    SET vCard = JSON_EXTRACT(pMoveJSON,'$.card');
    SET vTurnUUID = REPLACE(JSON_EXTRACT(pMoveJSON,'$.turnUUID'),'"','');
    SET vPlayerUUID = REPLACE(JSON_EXTRACT(pMoveJSON,'$.playerUUID'),'"','');
     
	SET vTurnExists = (SELECT count(*) FROM tbl_turn WHERE UUID=vTurnUUID AND GAME_UUID=pGameUUID)>0;
	SET vGameExists = (SELECT count(*) FROM tbl_game WHERE UUID=pGameUUID)>0;
	SET vPlayerExists = (SELECT count(*) FROM tbl_player WHERE UUID=vPlayerUUID)>0;
    
	IF(NOT vGameExists) THEN
		SET vMESSAGE = 'Game(' + vGameUUID + ') does not exist';
		SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = vMESSAGE;
    END IF;
	IF(NOT vPlayerExists) THEN
		SET vMESSAGE = 'Player('+vPlayerUUID+') does not exist';
		SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = vMESSAGE;
    END IF;
	
    IF(NOT vTurnExists) THEN
		SET vMESSAGE = concat('WARN: Turn does not exist');
		CALL sp_log_msg(vMESSAGE);
        
		INSERT INTO tbl_turn(UUID,GAME_UUID,PLAYER_UUID)
        VALUES (vTurnUUID,pGameUUID,vPlayerUUID);
	END IF;
    
    INSERT INTO tbl_move(TURN_UUID,FROM_POS,TO_POS,CARD_NUM,IS_DISCARD)
		VALUES(vTurnUUID,vFromPos,vToPos,vCard,vIsDiscard);
		
	CALL sp_updateCardPosition(pGameUUID,vFromPos,vToPos,vCard,vPlayerUUID);
END$$
DELIMITER ;
