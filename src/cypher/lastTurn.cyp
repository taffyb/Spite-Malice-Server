//{guuid:}

OPTIONAL MATCH p=(g:Game{uuid:$guuid})-[:NEXT_TURN*]->(t)
WITH (CASE WHEN p is NULL THEN 0 ELSE max(length(p)) END) as lastTurnId
RETURN lastTurnId