DROP PROCEDURE IF EXISTS sp_setCards;
DELIMITER $$
CREATE PROCEDURE `sp_setCards`(IN pGameUUID varchar(36),IN pCards varchar(1024),IN pPositionName varchar(15),IN pPlayerUUID varchar(36))
BEGIN
/*
  CREATED: 11/01/2020, Taffy Brecknock
  
  PARAMS IN:
  	pGameUUID		- Game that these cards belong to
	pCards			- A comma ',' delimited string of card numbers
	pPositionName	- The Name of the Position where the Card is to be set
	pPlayerUUID		- The Player holding the card if it is a Player position (Must NOT be NULL if is a player position)
  
  PRE_CONDITION:
  	Game Exists
  	Position Exists
  	Player Exists (if IS_PLAYER_POSITION)
  	  
  POST_CONDITION:
  	Cards have been inserted into tblCard
  
  CHANGE HISTORY:
*/
    DECLARE vCard INT;
    DECLARE finished INTEGER DEFAULT 0;
    DECLARE vMESSAGE VARCHAR(256);
    DECLARE vExists BOOLEAN;       
    DECLARE vIsPlayerPosition BOOLEAN; 
    DECLARE curCards CURSOR FOR SELECT card FROM temp;
    -- declare NOT FOUND handler
    DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET finished = 1;       
        
    SET vExists = (SELECT count(*) FROM tbl_game WHERE UUID=pGameUUID)>0;
	IF(NOT vExists) THEN
		SET vMESSAGE = 'Game('+vGameUUID+') does not exist';
		SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = vMESSAGE;
    END IF;        
    SET vExists = (SELECT count(*) FROM tbl_position WHERE NAME=pPositionName)>0;
	IF(NOT vExists) THEN
		SET vMESSAGE = 'Position('+vPositionName+') does not exist';
		SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = vMESSAGE;
    END IF;        
    SET vIsPlayerPosition = (SELECT count(*) FROM tbl_position WHERE NAME=pPositionName AND IS_PLAYER_POSITION=TRUE)>0;
    IF(vIsPlayerPosition AND pPlayerUUID IS NULL) THEN
		SET vMESSAGE = 'Player required when placeing a card at a player position';
		SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = vMESSAGE;
    END IF;        
    
	drop temporary table if exists temp;
	create temporary table temp( card int );
    set @sql = concat("insert into temp (card) values (", replace(pCards, ",", "),("),");");
    prepare stmt1 from @sql;
	execute stmt1;
        
	OPEN curCards;
    getCards: LOOP
        FETCH curCards INTO vCard;
        IF finished = 1 THEN 
            LEAVE getCards;
        END IF;
        -- build email list
        INSERT INTO tbl_card(GAME_UUID,CARD_NO,POSITION,PLAYER)
        VALUES(pGameUUID,vCard,(SELECT ID FROM tbl_position WHERE NAME=pPositionName),pPlayer);
    END LOOP getCards;
	CLOSE curCards;
/*        
  */  
END$$
DELIMITER ;