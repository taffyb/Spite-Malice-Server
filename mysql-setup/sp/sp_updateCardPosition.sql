DROP PROCEDURE IF EXISTS sp_updateCardPosition;
DELIMITER $$
CREATE PROCEDURE `sp_updateCardPosition`(pGameUUID varchar(36), pFromPos INT, pToPos INT, pCard INT, pPlayerUUID VARCHAR(36))
BEGIN
/*
  CREATED: 11/01/2020, Taffy Brecknock
  
  PARAMS IN:
	pGameUUID    - The UUID of the Game that this Card belongs to
    pFromPos	 - Position where the Card is currently
    pToPos		 - Position to move the Card to
    pCard		 - The Card number
    pPlayerUUID  - OPTIONAL The Player who holds the Position the Card is moving to
    
  PRE_CONDITION:
	The Card is in the from Position in this Game
    
  POST_CONDITION:
	The Card has been updated to the to Position and the Player has been set if it is a player postion
    
  CHANGE HISTORY:
*/
	UPDATE tbl_card
		SET POSITION = vToPos, PLAYER = vPlayerUUID
	WHERE GAME_UUID=pGameUUID AND CARD_NO=pCard AND POSITION=pFromPos;
END$$
DELIMITER ;
