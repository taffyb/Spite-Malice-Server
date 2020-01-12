SET GLOBAL log_bin_trust_function_creators = 1;
DROP FUNCTION IF EXISTS fn_positionName2Id;
DELIMITER $$
CREATE FUNCTION fn_positionName2Id(pPositionName VARCHAR(30)) RETURNS INT
BEGIN
	DECLARE RTN INT;
	
	SELECT ID FROM tbl_position WHERE NAME=pPositionName
		INTO RTN;
	
	RETURN RTN;
END$$
DELIMITER ;
