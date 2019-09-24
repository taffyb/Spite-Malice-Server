// {guuid:,puuid:,lastTurnId:}
MATCH (g:Game{uuid:$guuid})
MATCH (p:Player{uuid:$puuid})
MERGE (g)-[:NEXT_TURN]->(t:Turn{id:1,puuid:$puuid})-[:PLAYED_BY]->(p)
RETURN t.id as lastTurnId