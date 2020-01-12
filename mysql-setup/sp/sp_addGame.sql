DROP PROCEDURE IF EXISTS sp_addGame;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addGame`(
	IN pUUID varchar(36), 
	IN pName varchar(36), 
	IN pPlayer1UUID varchar(36), 
	IN pPlayer2UUID varchar(36))
BEGIN
/*
  CREATED: 11/01/2020, Taffy Brecknock
  
  PARAMS IN:
	pUUID 			- UUID used to identify the game 
	pName			- Game's Name 
	pPlayer1UUID	- Identifyer of Player 1
	pPlayer2UUID	- Identifyer of Player 2
  	
  PRE_CONDITION:
  	The Game does not already exist 
  	Player1 MUST exist in tbl_Player
  	Player2 MUST exist in tbl_Player
  
  POST_CONDITION:
  	A new row is INSERTED into tbl_Game
  
  CHANGE HISTORY:
  	11/01/2020 - Call setGameState = ACTIVE when create a new game
  	12/01/2020 - FIX pGameUUID=>pUUID
*/
	DECLARE vPlayerExists BOOLEAN;
    DECLARE vMESSAGE VARCHAR(256);
    
	SET vMESSAGE = concat('CALL sp_addGame(',pUUID,',',pName,',',pPlayer1UUID,',',pPlayer2UUID,')');
	CALL sp_log_msg(vMESSAGE);
	
	SET vPlayerExists = (SELECT count(*) FROM tbl_player WHERE UUID=pPlayer1UUID)>0;
	IF(NOT vPlayerExists) THEN
		SET vMESSAGE = 'Player1('+vPlayer1UUID+') does not exist';
		SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = vMESSAGE;
    END IF;

	SET vPlayerExists = (SELECT count(*) FROM tbl_player WHERE UUID=pPlayer2UUID)>0;
	IF(NOT vPlayerExists) THEN
		SET vMESSAGE = 'Player2('+vPlayer2UUID+') does not exist';
		SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = vMESSAGE;
    END IF;
		
    INSERT INTO tbl_game(UUID,NAME,PLAYER1_UUID,PLAYER2_UUID)
    	VALUES(pUUID,pName,pPlayer1UUID,pPlayer2UUID);
    
    -- CALL sp_log_msg( 'B4 CALL setGameState');
    CALL sp_setGameState(pUUID,'ACTIVE');
END$$
DELIMITER ;