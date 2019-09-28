// {guuid:,moves:[{from:,to:,card:,isDiscard:,isUndo:}],lastTurnId:}


MATCH (g{uuid:$guuid})-[:NEXT_TURN*]->(t:Turn)
WITH t
WHERE t.id=toInteger($lastTurnId)
UNWIND $moves as move
CREATE (m:Move{from:toInteger(move.from),to:toInteger(move.to),card:toInteger(move.card),puuid:move.puuid})
WITH t,m,move
FOREACH (x IN CASE WHEN move.isDiscard=true THEN ["isDiscard"] ELSE [] END |
	SET m:Discard
)
FOREACH (x IN CASE WHEN move.isUndo=true THEN ["isUndo"] ELSE [] END |
	SET m:Undo
)
WITH t,collect(m) as moves
WITH t,moves, moves[0] as firstMove
MERGE (t)-[:NEXT_MOVE]->(firstMove)
WITH t,moves
UNWIND apoc.coll.pairsMin(moves) as pair
WITH moves,pair[0] as m1,pair[1] as m2
MERGE (m1)-[:NEXT_MOVE]->(m2)
RETURN length(moves) as moveCount