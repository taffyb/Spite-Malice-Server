// {guuid:,puuid:,lastTurnId:}
MATCH (g:Game{uuid:$guuid})
MATCH (p:Player{uuid:$puuid})
MATCH (g)-[:NEXT_TURN*]->(t:Turn)
WITH g,p,t
WHERE t.id=toInteger($lastTurnId)
MERGE (t)-[:NEXT_TURN]->(lastTurn:Turn{id:toInteger($lastTurnId)+1,puuid:$puuid})-[:PLAYED_BY]->(p)
RETURN lastTurn.id as lastTurnId