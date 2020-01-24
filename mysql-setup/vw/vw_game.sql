DROP VIEW IF EXISTS vw_game;

CREATE VIEW `vw_game` AS
    SELECT 
        g.UUID AS UUID,
        g.NAME AS NAME,
        g.PLAYER1_UUID AS PLAYER1_UUID,
        p1.NAME AS PLAYER1_NAME,
        g.PLAYER2_UUID AS PLAYER2_UUID,
        p2.NAME AS PLAYER2_NAME,
        g.DELETED AS DELETED
    FROM
        tbl_game AS g,
        tbl_player AS p1,
        tbl_player AS p2
    WHERE
        p1.UUID = g.PLAYER1_UUID
            AND p2.UUID = g.PLAYER2_UUID
