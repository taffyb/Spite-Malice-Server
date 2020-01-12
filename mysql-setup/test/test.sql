DROP PROCEDURE IF EXISTS sp_test;
DELIMITER $$
CREATE PROCEDURE sp_test()
BEGIN
	DECLARE vGameUUID VARCHAR(36);
	DECLARE vPlayer1UUID VARCHAR(36);
	DECLARE vPlayer2UUID VARCHAR(36);
	DECLARE vTurnUUID VARCHAR(36);
    DECLARE vMove VARCHAR(1000);
    DECLARE vMESSAGE VARCHAR(1024);
	
    SET vGameUUID=UUID();
    SET vPlayer1UUID=UUID();
    SET vPlayer2UUID=UUID();
    SET vTurnUUID=UUID();
    
	CALL sp_log_msg( '***BEGIN TEST***');
	-- Create two Players
	CALL sp_addPlayer(vPlayer1UUID,'Player 1');
	CALL sp_addPlayer(vPlayer2UUID,'Player 2');
	IF(NOT (SELECT count(*) FROM tbl_player WHERE UUID=vPlayer1UUID OR UUID=vPlayer2UUID AND NOT DELETED=TRUE)=2) THEN
		SET vMESSAGE = 'Error adding Players';
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = vMESSAGE;
	END IF;
	CALL sp_log_msg( 'Created two Players');
	-- Create a new Game
	CALL sp_addGame(vGameUUID,'Test Game',vPlayer1UUID,vPlayer2UUID);
	IF(NOT (SELECT count(*) from tbl_game WHERE UUID=vGameUUID)=1) THEN
		SET vMESSAGE = 'Error adding Game';
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = vMESSAGE;
	END IF;
	CALL sp_log_msg( 'Created New Game');
			
	-- set cards in deck 
	CALL sp_setCards(vGameUUID,'1,2,3,4,5,6,7,8,9,10,11,12,13','DECK',NULL);
	CALL sp_setCards(vGameUUID,'26,25,24,23,22,21,20,19,18,17,16,15,14','PLAYER_PILE',vPlayer1UUID);
	IF(NOT (SELECT count(*) from tbl_card WHERE GAME_UUID=vGameUUID AND POSITION = fn_positionName2Id('DECK'))=13) THEN
		SET vMESSAGE = 'Error adding Game';
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = vMESSAGE;
	END IF;
    SET vMove=concat('{','"turnUUID":"',vTurnUUID,'","playerUUID":"',vPlayer1UUID,'",',
					   '"fromPos":',fn_positionName2Id('PLAYER_PILE'),',"toPos":',fn_positionName2Id('STACK_1'),',',
                       '"card":14',',"isDiscard":false',
                       '}');
	CALL sp_addMove(vGameUUID,vMove);
    IF(NOT (SELECT POSITION from tbl_card WHERE GAME_UUID=vGameUUID AND CARD_NO = 14)=fn_positionName2Id('STACK_1')) THEN
		SET vMESSAGE = 'Error moving card';
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = vMESSAGE;
	END IF;
    SET vMove=concat('{','"turnUUID":"',vTurnUUID,'","playerUUID":"',vPlayer1UUID,'",',
					   '"fromPos":',fn_positionName2Id('PLAYER_PILE'),',"toPos":',fn_positionName2Id('STACK_2'),',',
                       '"card":13',',"isDiscard":false',
                       '}');
	CALL sp_addMove(vGameUUID,vMove);
END$$
DELIMITER ;