DROP USER IF EXISTS 'sm'@'localhost';

CREATE USER 'sm'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sm1972plus';

GRANT EXECUTE ON PROCEDURE sp_addPlayer TO sm;
GRANT EXECUTE ON PROCEDURE sp_getPlayer TO sm;
GRANT EXECUTE ON PROCEDURE sp_getPlayers TO sm;
GRANT EXECUTE ON PROCEDURE sp_deletePlayer TO sm;
GRANT EXECUTE ON PROCEDURE sp_updatePlayer TO sm;
GRANT EXECUTE ON PROCEDURE sp_addMove TO sm;
GRANT EXECUTE ON PROCEDURE sp_addGame TO sm;
GRANT EXECUTE ON PROCEDURE sp_addGame TO sm;
GRANT EXECUTE ON PROCEDURE sp_getGame TO sm;
GRANT EXECUTE ON PROCEDURE sp_getGames TO sm;
GRANT EXECUTE ON PROCEDURE sp_deleteGame TO sm;
GRANT EXECUTE ON PROCEDURE sp_updateGame TO sm;
GRANT EXECUTE ON PROCEDURE sp_setGameState TO sm;
GRANT EXECUTE ON PROCEDURE sp_setCards TO sm;
GRANT EXECUTE ON PROCEDURE sp_updateCardPosition TO sm;
GRANT SELECT ON vw_game_moves TO sm;
GRANT SELECT ON vw_position TO sm;

