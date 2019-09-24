// {guuid:,moves:[{from:,to:,card:,isDiscard}],lastTurnId:}


MATCH (g{uuid:$guuid})-[:NEXT_TURN*]->(t:Turn)
WITH t
WHERE t.id=toInteger($lastTurnId)
UNWIND $moves as move
CREATE (m:Move{from:toInteger(move.from),to:toInteger(move.to),card:toInteger(move.card),puuid:move.puuid})
WITH t,m,move
FOREACH (x IN CASE WHEN move.isDiscard=true THEN ["isDiscard"] ELSE [] END |
	SET m:Discard
)
WITH t,collect(m) as moves
WITH t,moves, moves[0] as firstMove
MERGE (t)-[:NEXT_MOVE]->(firstMove)
RETURN length(moves) as moveCount